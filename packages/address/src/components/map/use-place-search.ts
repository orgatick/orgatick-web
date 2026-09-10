"use client";

import type { BBox, Feature, FeatureCollection, Point } from "geojson";
import { useEffect, useState } from "react";

export interface PlaceFeatureProperties {
  osm_id: number;
  osm_type: "N" | "W" | "R";
  osm_key: string;
  osm_value: string;
  type: string;
  name?: string;
  housenumber?: string;
  street?: string;
  locality?: string;
  district?: string;
  postcode?: string;
  city?: string;
  county?: string;
  state?: string;
  country?: string;
  countrycode?: string;
  extent?: [number, number, number, number];
  extra?: Record<string, string>;
}

export type PlaceFeature = Feature<Point, PlaceFeatureProperties>;
export type PlaceFeatureCollection = FeatureCollection<Point, PlaceFeatureProperties>;

export interface PlaceSearchOptions {
  query: string;
  lang?: string;
  limit?: number;
  bbox?: BBox;
  lat?: number;
  lon?: number;
  zoom?: number;
  locationBiasScale?: number;
}

export function formatAddress(properties: PlaceFeatureProperties): string {
  const parts = [
    properties.name,
    properties.housenumber ? `${properties.housenumber} ${properties.street || ""}`.trim() : properties.street,
    properties.locality,
    properties.district,
    properties.city,
    properties.state,
    properties.postcode,
    properties.country,
  ];

  return parts
    .filter((value): value is string => Boolean(value))
    .filter((value, index, self) => self.indexOf(value) === index)
    .join(", ");
}

export function buildSearchUrl({
  query,
  lang,
  limit,
  bbox,
  lat,
  lon,
  zoom,
  locationBiasScale,
}: PlaceSearchOptions): string {
  const url = new URL("https://photon.komoot.io/api/");
  url.searchParams.set("q", query);

  if (lang) {
    url.searchParams.set("lang", lang);
  }

  if (limit) {
    url.searchParams.set("limit", String(limit));
  }

  if (bbox) {
    url.searchParams.set("bbox", bbox.join(","));
  }

  if (lat !== undefined && lon !== undefined) {
    url.searchParams.set("lat", String(lat));
    url.searchParams.set("lon", String(lon));
  }

  if (zoom !== undefined) {
    url.searchParams.set("zoom", String(zoom));
  }

  if (locationBiasScale !== undefined) {
    url.searchParams.set("location_bias_scale", String(locationBiasScale));
  }

  return String(url);
}

export function useDebounce<T>(value: T, delay = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export function usePlaceSearch({
  debounceMs = 300,
  query,
  lang,
  limit,
  bbox,
  lat,
  lon,
  zoom,
  locationBiasScale,
}: {
  debounceMs?: number;
} & PlaceSearchOptions) {
  const [results, setResults] = useState<PlaceFeature[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const debouncedQuery = useDebounce(query, debounceMs);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      setIsLoading(false);
      setHasSearched(false);
      return;
    }

    const abortController = new AbortController();

    async function fetchResults() {
      setIsLoading(true);
      setError(null);
      setHasSearched(true);

      try {
        const url = buildSearchUrl({
          query: debouncedQuery,
          lang,
          limit,
          bbox,
          lat,
          lon,
          zoom,
          locationBiasScale,
        });
        const response = await fetch(url, {
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error(`Photon API error: ${response.status} ${response.statusText}`);
        }

        const data: PlaceFeatureCollection = await response.json();
        const addressOsmIds = new Set<number>();
        const dedupedFeatures = data.features.filter((feature) => {
          const id = feature.properties.osm_id;
          if (addressOsmIds.has(id)) return false;
          addressOsmIds.add(id);
          return true;
        });
        setResults(dedupedFeatures);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err);
          setResults([]);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchResults();

    return () => abortController.abort();
  }, [debouncedQuery, lang, limit, bbox, lat, lon, zoom, locationBiasScale]);

  return { results, isLoading, error, hasSearched };
}
