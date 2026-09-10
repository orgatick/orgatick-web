"use client";

import { Button } from "@orgatick/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@orgatick/ui/components/dropdown-menu";
import { cn } from "@orgatick/ui/lib/utils";
import { IconLayersIntersect } from "@tabler/icons-react";
import type { FeatureGroup, LayerGroup } from "leaflet";
import { useTheme } from "next-themes";
import React, { type Ref, useEffect, useState } from "react";
import { type LayerGroupProps, type TileLayerProps, useMap } from "react-leaflet";
import { LeafletFeatureGroup, LeafletLayerGroup, LeafletTileLayer } from "./leaflet-lazy";
import { MapLayersContext, useMapLayersContext } from "./map-context";
import type { MapLayerGroupOption, MapTileLayerOption } from "./types";

export function MapTileLayer({
  name,
  url,
  attribution,
  darkUrl,
  darkAttribution,
  ...props
}: Omit<TileLayerProps, "url"> & {
  name: string;
  url?: string;
  darkUrl?: string;
  darkAttribution?: string;
}) {
  const context = useMapLayersContext();
  const DEFAULT_URL = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png";
  const DEFAULT_DARK_URL = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png";

  const { resolvedTheme } = useTheme();
  const resolvedUrl = resolvedTheme === "dark" ? (darkUrl ?? url ?? DEFAULT_DARK_URL) : (url ?? DEFAULT_URL);
  const resolvedAttribution =
    resolvedTheme === "dark" && darkAttribution
      ? darkAttribution
      : attribution ||
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>';

  useEffect(() => {
    if (context) {
      context.registerTileLayer({
        name,
        url: resolvedUrl,
        attribution: resolvedAttribution,
      });
    }
  }, [context, name, resolvedUrl, resolvedAttribution]);

  if (context && context.selectedTileLayer !== name) {
    return null;
  }

  return <LeafletTileLayer {...props} url={resolvedUrl} attribution={resolvedAttribution} />;
}

export function MapLayerGroup({
  name,
  disabled,
  ...props
}: LayerGroupProps & MapLayerGroupOption & { ref?: Ref<LayerGroup> }) {
  const context = useMapLayersContext();

  useEffect(() => {
    if (context) {
      context.registerLayerGroup({
        name,
        disabled,
      });
    }
  }, [context, name, disabled]);

  if (context && !context.activeLayerGroups.includes(name)) {
    return null;
  }

  return <LeafletLayerGroup {...props} />;
}

export function MapFeatureGroup({
  name,
  disabled,
  ...props
}: LayerGroupProps & MapLayerGroupOption & { ref?: Ref<FeatureGroup> }) {
  const context = useMapLayersContext();

  useEffect(() => {
    if (context) {
      context.registerLayerGroup({
        name,
        disabled,
      });
    }
  }, [context, name, disabled]);

  if (context && !context.activeLayerGroups.includes(name)) {
    return null;
  }

  return <LeafletFeatureGroup {...props} />;
}

export function MapLayers({
  defaultTileLayer,
  defaultLayerGroups = [],
  ...props
}: Omit<React.ComponentProps<typeof MapLayersContext.Provider>, "value"> & {
  defaultTileLayer?: string;
  defaultLayerGroups?: string[];
}) {
  const [tileLayers, setTileLayers] = useState<MapTileLayerOption[]>([]);
  const [selectedTileLayer, setSelectedTileLayer] = useState<string>(defaultTileLayer || "");
  const [layerGroups, setLayerGroups] = useState<MapLayerGroupOption[]>([]);
  const [activeLayerGroups, setActiveLayerGroups] = useState<string[]>(defaultLayerGroups);

  function registerTileLayer(tileLayer: MapTileLayerOption) {
    setTileLayers((prevTileLayers) => {
      if (prevTileLayers.some((layer) => layer.name === tileLayer.name)) {
        return prevTileLayers;
      }
      return [...prevTileLayers, tileLayer];
    });
  }

  function registerLayerGroup(layerGroup: MapLayerGroupOption) {
    setLayerGroups((prevLayerGroups) => {
      if (prevLayerGroups.some((group) => group.name === layerGroup.name)) {
        return prevLayerGroups;
      }
      return [...prevLayerGroups, layerGroup];
    });
  }

  useEffect(() => {
    if (
      defaultTileLayer &&
      tileLayers.length > 0 &&
      !tileLayers.some((tileLayer) => tileLayer.name === defaultTileLayer)
    ) {
      throw new Error(
        `Invalid defaultTileLayer "${defaultTileLayer}" provided to MapLayers. It must match a MapTileLayer's name prop.`,
      );
    }

    if (tileLayers.length > 0 && !selectedTileLayer) {
      const validDefaultValue =
        defaultTileLayer && tileLayers.some((layer) => layer.name === defaultTileLayer)
          ? defaultTileLayer
          : (tileLayers[0]?.name ?? "");
      setSelectedTileLayer(validDefaultValue);
    }

    if (
      defaultLayerGroups.length > 0 &&
      layerGroups.length > 0 &&
      defaultLayerGroups.some((name) => !layerGroups.some((group) => group.name === name))
    ) {
      throw new Error(
        "Invalid defaultLayerGroups value provided to MapLayers. All names must match a MapLayerGroup's name prop.",
      );
    }
  }, [tileLayers, defaultTileLayer, selectedTileLayer, layerGroups, defaultLayerGroups]);

  return (
    <MapLayersContext.Provider
      value={{
        registerTileLayer,
        tileLayers,
        selectedTileLayer,
        setSelectedTileLayer,
        registerLayerGroup,
        layerGroups,
        activeLayerGroups,
        setActiveLayerGroups,
      }}
      {...props}
    />
  );
}

export function MapLayersControl({
  position = "top-1 right-1",
  tileLayersLabel = "Base Layers",
  layerGroupsLabel = "Layers",
  className,
  ...props
}: React.ComponentProps<typeof Button> & {
  position?: string;
  tileLayersLabel?: string;
  layerGroupsLabel?: string;
}) {
  const _map = useMap();
  const layersContext = useMapLayersContext();

  if (!layersContext) {
    throw new Error("MapLayersControl must be used within MapLayers");
  }

  const { tileLayers, selectedTileLayer, setSelectedTileLayer, layerGroups, activeLayerGroups, setActiveLayerGroups } =
    layersContext;

  if (tileLayers.length === 0 && layerGroups.length === 0) {
    return null;
  }

  function handleLayerGroupToggle(name: string, checked: boolean) {
    setActiveLayerGroups(
      checked ? [...activeLayerGroups, name] : activeLayerGroups.filter((groupName: string) => groupName !== name),
    );
  }

  const showTileLayersDropdown = tileLayers.length > 1;
  const showLayerGroupsDropdown = layerGroups.length > 0;

  if (!showTileLayersDropdown && !showLayerGroupsDropdown) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            type="button"
            variant="secondary"
            size="icon-sm"
            aria-label="Select layers"
            title="Select layers"
            className={cn("absolute z-1000 border", position, className)}
            {...props}
          />
        }
      >
        <IconLayersIntersect />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-1000">
        {showTileLayersDropdown && (
          <>
            <DropdownMenuLabel>{tileLayersLabel}</DropdownMenuLabel>
            <DropdownMenuRadioGroup
              value={selectedTileLayer}
              onValueChange={(val) => {
                if (val) setSelectedTileLayer(val);
              }}
            >
              {tileLayers.map((tileLayer: MapTileLayerOption) => (
                <DropdownMenuRadioItem key={tileLayer.name} value={tileLayer.name}>
                  {tileLayer.name}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </>
        )}
        {showTileLayersDropdown && showLayerGroupsDropdown && <DropdownMenuSeparator />}
        {showLayerGroupsDropdown && (
          <>
            <DropdownMenuLabel>{layerGroupsLabel}</DropdownMenuLabel>
            {layerGroups.map((layerGroup: MapLayerGroupOption) => (
              <DropdownMenuCheckboxItem
                key={layerGroup.name}
                checked={activeLayerGroups.includes(layerGroup.name)}
                disabled={layerGroup.disabled}
                onCheckedChange={(checked) => handleLayerGroupToggle(layerGroup.name, checked)}
              >
                {layerGroup.name}
              </DropdownMenuCheckboxItem>
            ))}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
