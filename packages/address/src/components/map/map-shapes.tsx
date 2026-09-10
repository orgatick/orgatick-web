"use client";

import { cn } from "@orgatick/ui/lib/utils";
import type { DivIconOptions, PointExpression } from "leaflet";
import type { ReactNode } from "react";
import { renderToString } from "react-dom/server";
import type {
  CircleMarkerProps,
  CircleProps,
  MarkerProps,
  PolygonProps,
  PolylineProps,
  PopupProps,
  RectangleProps,
  TooltipProps,
} from "react-leaflet";
import type { MarkerClusterGroupProps } from "react-leaflet-markercluster";
import {
  LeafletCircle,
  LeafletCircleMarker,
  LeafletMarker,
  LeafletMarkerClusterGroup,
  LeafletPolygon,
  LeafletPolyline,
  LeafletPopup,
  LeafletRectangle,
  LeafletTooltip,
} from "./leaflet-lazy";
import { useLeaflet } from "./use-leaflet";

export function MapMarker({
  icon,
  iconAnchor = [12, 12],
  iconOptions = { className: "" },
  ...props
}: Omit<MarkerProps, "icon"> & {
  icon?: ReactNode;
  iconAnchor?: PointExpression;
  iconOptions?: DivIconOptions;
}) {
  const { L } = useLeaflet();

  if (icon && !L) {
    return null;
  }

  const customIcon =
    icon && L
      ? L.divIcon({
          ...iconOptions,
          iconAnchor,
          html: renderToString(icon),
        })
      : undefined;

  return <LeafletMarker {...props} {...(customIcon ? { icon: customIcon } : {})} />;
}

export function MapMarkerClusterGroup({
  className,
  children,
  iconCreateFunction,
  ...props
}: MarkerClusterGroupProps & {
  children?: ReactNode;
  className?: string;
  iconCreateFunction?: (cluster: unknown) => unknown;
}) {
  const { L } = useLeaflet();

  if (!L) {
    return null;
  }

  const defaultIconCreateFunction = (cluster: unknown) => {
    const clusterObj = cluster as { getChildCount: () => number };
    const markerCount = clusterObj.getChildCount();
    const iconNode = (
      <span
        className={cn(
          "bg-primary/90 text-primary-foreground flex size-7 items-center justify-center rounded-full text-xs font-semibold shadow-md",
          className,
        )}
      >
        {markerCount}
      </span>
    );
    return L.divIcon({
      html: renderToString(iconNode),
      className: "cluster-icon",
      iconAnchor: [14, 14],
    });
  };

  return (
    <LeafletMarkerClusterGroup iconCreateFunction={iconCreateFunction ?? defaultIconCreateFunction} {...props}>
      {children}
    </LeafletMarkerClusterGroup>
  );
}

export function MapCircle({ ...props }: CircleProps) {
  return <LeafletCircle {...props} />;
}

export function MapCircleMarker({ ...props }: CircleMarkerProps) {
  return <LeafletCircleMarker {...props} />;
}

export function MapPolyline({ ...props }: PolylineProps) {
  return <LeafletPolyline {...props} />;
}

export function MapPolygon({ ...props }: PolygonProps) {
  return <LeafletPolygon {...props} />;
}

export function MapRectangle({ ...props }: RectangleProps) {
  return <LeafletRectangle {...props} />;
}

export function MapPopup({
  className,
  ...props
}: PopupProps & {
  className?: string;
}) {
  return (
    <LeafletPopup
      className={cn(
        "[&_.leaflet-popup-content-wrapper]:bg-popover [&_.leaflet-popup-content-wrapper]:text-popover-foreground [&_.leaflet-popup-content-wrapper]:rounded-lg [&_.leaflet-popup-content-wrapper]:shadow-md [&_.leaflet-popup-tip]:bg-popover",
        className,
      )}
      {...props}
    />
  );
}

export function MapTooltip({
  direction = "top",
  offset = [0, 0],
  className,
  ...props
}: TooltipProps & {
  className?: string;
}) {
  const ARROW_POSITION_CLASSES = {
    top: "[&_.leaflet-tooltip-bottom]:before:border-b-popover",
    bottom: "[&_.leaflet-tooltip-top]:before:border-t-popover",
    left: "[&_.leaflet-tooltip-right]:before:border-r-popover",
    right: "[&_.leaflet-tooltip-left]:before:border-l-popover",
  };

  const DEFAULT_OFFSET = {
    top: [0, -10],
    bottom: [0, 10],
    left: [-10, 0],
    right: [10, 0],
  };

  return (
    <LeafletTooltip
      direction={direction}
      offset={
        (offset as [number, number])[0] === 0 && (offset as [number, number])[1] === 0
          ? (DEFAULT_OFFSET[direction as keyof typeof DEFAULT_OFFSET] as PointExpression)
          : offset
      }
      className={cn(
        "bg-popover text-popover-foreground rounded-md px-2 py-1 text-xs shadow-md border border-border",
        ARROW_POSITION_CLASSES[direction as keyof typeof ARROW_POSITION_CLASSES],
        className,
      )}
      {...props}
    />
  );
}
