"use client";

import { cn } from "@orgatick/ui/lib/utils";
import type { MapContainerProps } from "react-leaflet";
import { LeafletMapContainer } from "./leaflet-lazy";

export interface MapProps extends MapContainerProps {
  className?: string;
}

function MapRoot({ zoom = 15, maxZoom = 18, center = [0, 0], className, children, ...props }: MapProps) {
  return (
    <LeafletMapContainer
      center={center}
      zoom={zoom}
      maxZoom={maxZoom}
      className={cn("relative z-10 size-full min-h-60", className)}
      {...props}
    >
      {children}
    </LeafletMapContainer>
  );
}

export { MapRoot as Map, MapRoot };
