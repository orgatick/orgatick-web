"use client";

import type React from "react";
import { Suspense, lazy, useEffect, useState } from "react";
import type { MarkerClusterGroupProps } from "react-leaflet-markercluster";

import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet.fullscreen/dist/Control.FullScreen.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet/dist/leaflet.css";

export function createLazyComponent<T extends React.ElementType>(factory: () => Promise<{ default: T }>) {
  const LazyComponent = lazy(
    factory as unknown as () => Promise<{ default: React.ComponentType<React.ComponentProps<T>> }>,
  );
  return (props: React.ComponentProps<T>) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    if (!isMounted) {
      return null;
    }

    return (
      <Suspense fallback={null}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

export const LeafletMapContainer = createLazyComponent(() =>
  import("react-leaflet").then((mod) => ({ default: mod.MapContainer })),
);

export const LeafletTileLayer = createLazyComponent(() =>
  import("react-leaflet").then((mod) => ({ default: mod.TileLayer })),
);

export const LeafletMarker = createLazyComponent(() =>
  import("react-leaflet").then((mod) => ({ default: mod.Marker })),
);

export const LeafletPopup = createLazyComponent(() => import("react-leaflet").then((mod) => ({ default: mod.Popup })));

export const LeafletTooltip = createLazyComponent(() =>
  import("react-leaflet").then((mod) => ({ default: mod.Tooltip })),
);

export const LeafletCircle = createLazyComponent(() =>
  import("react-leaflet").then((mod) => ({ default: mod.Circle })),
);

export const LeafletCircleMarker = createLazyComponent(() =>
  import("react-leaflet").then((mod) => ({ default: mod.CircleMarker })),
);

export const LeafletPolyline = createLazyComponent(() =>
  import("react-leaflet").then((mod) => ({ default: mod.Polyline })),
);

export const LeafletPolygon = createLazyComponent(() =>
  import("react-leaflet").then((mod) => ({ default: mod.Polygon })),
);

export const LeafletRectangle = createLazyComponent(() =>
  import("react-leaflet").then((mod) => ({ default: mod.Rectangle })),
);

export const LeafletLayerGroup = createLazyComponent(() =>
  import("react-leaflet").then((mod) => ({ default: mod.LayerGroup })),
);

export const LeafletFeatureGroup = createLazyComponent(() =>
  import("react-leaflet").then((mod) => ({ default: mod.FeatureGroup })),
);

export const LeafletMarkerClusterGroup = createLazyComponent<
  React.ComponentType<MarkerClusterGroupProps & { children?: React.ReactNode }>
>(() =>
  import("react-leaflet-markercluster").then((mod) => ({
    default: (
      mod as unknown as { default: React.ComponentType<MarkerClusterGroupProps & { children?: React.ReactNode }> }
    ).default,
  })),
);
