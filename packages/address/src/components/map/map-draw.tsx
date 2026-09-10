"use client";

import { Button } from "@orgatick/ui/components/button";
import { ButtonGroup } from "@orgatick/ui/components/button-group";
import { cn } from "@orgatick/ui/lib/utils";
import {
  IconArrowBackUp,
  IconCircle,
  IconMapPin,
  IconPencil,
  IconPentagon,
  IconRoute,
  IconSquare,
  IconTrash,
} from "@tabler/icons-react";
import type { Draw, DrawEvents, DrawMap, DrawOptions, EditToolbar } from "leaflet";
import type * as L from "leaflet";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { renderToString } from "react-dom/server";
import { useMap } from "react-leaflet";
import { LeafletFeatureGroup } from "./leaflet-lazy";
import { MapControlContainer } from "./map-controls";
import { MapDrawContext, useMapDrawContext } from "./map-context";
import type { MapDrawAction, MapDrawMode, MapDrawShape } from "./types";
import { useLeaflet } from "./use-leaflet";

export function useMapDrawHandleIcon() {
  const { L } = useLeaflet();
  if (!L) return null;

  return L.divIcon({
    iconAnchor: [8, 8],
    html: renderToString(
      <IconCircle className="fill-primary stroke-primary size-4 transition-transform hover:scale-110" />,
    ),
  });
}

export function MapDrawControl({
  onLayersChange,
  position = "bottom-1 left-1",
  className,
  ...props
}: React.ComponentProps<"div"> & {
  onLayersChange?: (layers: L.FeatureGroup) => void;
  position?: string;
}) {
  const { L, LeafletDraw } = useLeaflet();
  const map = useMap();
  const featureGroupRef = useRef<L.FeatureGroup | null>(null);
  const editControlRef = useRef<EditToolbar.Edit | null>(null);
  const deleteControlRef = useRef<EditToolbar.Delete | null>(null);
  const [activeMode, setActiveMode] = useState<MapDrawMode>(null);
  const [layersCount, setLayersCount] = useState(0);

  const onLayersChangeRef = useRef(onLayersChange);
  useEffect(() => {
    onLayersChangeRef.current = onLayersChange;
  }, [onLayersChange]);

  const updateLayersCount = useCallback(() => {
    if (featureGroupRef.current) {
      setLayersCount(featureGroupRef.current.getLayers().length);
    }
  }, []);

  const handleDrawCreated = useCallback(
    (event: DrawEvents.Created) => {
      if (!featureGroupRef.current) return;
      const { layer } = event;
      featureGroupRef.current.addLayer(layer);
      onLayersChangeRef.current?.(featureGroupRef.current);
      updateLayersCount();
      setActiveMode(null);
    },
    [updateLayersCount],
  );

  const handleDrawEditedOrDeleted = useCallback(() => {
    if (!featureGroupRef.current) return;
    onLayersChangeRef.current?.(featureGroupRef.current);
    updateLayersCount();
    setActiveMode(null);
  }, [updateLayersCount]);

  useEffect(() => {
    if (!L || !LeafletDraw || !map) return;

    map.on(L.Draw.Event.CREATED, handleDrawCreated as L.LeafletEventHandlerFn);
    map.on(L.Draw.Event.EDITED, handleDrawEditedOrDeleted);
    map.on(L.Draw.Event.DELETED, handleDrawEditedOrDeleted);

    return () => {
      map.off(L.Draw.Event.CREATED, handleDrawCreated as L.LeafletEventHandlerFn);
      map.off(L.Draw.Event.EDITED, handleDrawEditedOrDeleted);
      map.off(L.Draw.Event.DELETED, handleDrawEditedOrDeleted);
    };
  }, [L, LeafletDraw, map, handleDrawCreated, handleDrawEditedOrDeleted]);

  return (
    <MapDrawContext.Provider
      value={{
        featureGroup: featureGroupRef.current,
        activeMode,
        setActiveMode,
        editControlRef,
        deleteControlRef,
        layersCount,
      }}
    >
      <LeafletFeatureGroup ref={featureGroupRef} />
      <MapControlContainer className={cn(position, className)}>
        <ButtonGroup orientation="vertical" {...props} />
      </MapControlContainer>
    </MapDrawContext.Provider>
  );
}

export function MapDrawShapeButton<T extends Draw.Feature>({
  drawMode,
  createDrawTool,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  drawMode: MapDrawShape;
  createDrawTool: (L: typeof import("leaflet"), map: DrawMap) => T;
}) {
  const drawContext = useMapDrawContext();
  if (!drawContext) {
    throw new Error("MapDrawShapeButton must be used within MapDrawControl");
  }
  const { L } = useLeaflet();
  const map = useMap();
  const controlRef = useRef<T | null>(null);
  const { activeMode, setActiveMode } = drawContext;
  const isActive = activeMode === drawMode;

  useEffect(() => {
    if (!L || !isActive) {
      controlRef.current?.disable();
      controlRef.current = null;
      return;
    }
    const control = createDrawTool(L, map as DrawMap);
    control.enable();
    controlRef.current = control;
    return () => {
      control.disable();
      controlRef.current = null;
    };
  }, [L, map, isActive, createDrawTool]);

  function handleClick() {
    setActiveMode(isActive ? null : drawMode);
  }

  return (
    <Button
      type="button"
      size="icon-sm"
      aria-label={`Draw ${drawMode}`}
      title={`Draw ${drawMode}`}
      className={cn("border", className)}
      variant={isActive ? "default" : "secondary"}
      disabled={activeMode === "edit" || activeMode === "delete"}
      onClick={handleClick}
      {...props}
    />
  );
}

export function MapDrawMarker({ ...props }: DrawOptions.MarkerOptions) {
  return (
    <MapDrawShapeButton
      drawMode="marker"
      createDrawTool={(L, map) =>
        new L.Draw.Marker(map, {
          icon: L.divIcon({
            className: "",
            iconAnchor: [12, 12],
            html: renderToString(<IconMapPin className="size-6" />),
          }),
          ...props,
        })
      }
    >
      <IconMapPin />
    </MapDrawShapeButton>
  );
}

export function MapDrawPolyline({
  showLength = false,
  drawError = {
    color: "var(--color-destructive)",
  },
  shapeOptions = {
    color: "var(--color-primary)",
    opacity: 1,
    weight: 2,
  },
  ...props
}: DrawOptions.PolylineOptions) {
  const mapDrawHandleIcon = useMapDrawHandleIcon();

  return (
    <MapDrawShapeButton
      drawMode="polyline"
      createDrawTool={(L, map) =>
        new L.Draw.Polyline(map, {
          ...(mapDrawHandleIcon
            ? {
                icon: mapDrawHandleIcon,
                touchIcon: mapDrawHandleIcon,
              }
            : {}),
          showLength,
          drawError,
          shapeOptions,
          ...props,
        })
      }
    >
      <IconRoute />
    </MapDrawShapeButton>
  );
}

export function MapDrawCircle({
  showRadius = false,
  shapeOptions = {
    color: "var(--color-primary)",
    opacity: 1,
    weight: 2,
  },
  ...props
}: DrawOptions.CircleOptions) {
  return (
    <MapDrawShapeButton
      drawMode="circle"
      createDrawTool={(L, map) =>
        new L.Draw.Circle(map, {
          showRadius,
          shapeOptions,
          ...props,
        })
      }
    >
      <IconCircle />
    </MapDrawShapeButton>
  );
}

export function MapDrawRectangle({
  showArea = false,
  shapeOptions = {
    color: "var(--color-primary)",
    opacity: 1,
    weight: 2,
  },
  ...props
}: DrawOptions.RectangleOptions) {
  return (
    <MapDrawShapeButton
      drawMode="rectangle"
      createDrawTool={(L, map) =>
        new L.Draw.Rectangle(map, {
          showArea,
          shapeOptions,
          ...props,
        })
      }
    >
      <IconSquare />
    </MapDrawShapeButton>
  );
}

export function MapDrawPolygon({
  drawError = {
    color: "var(--color-destructive)",
  },
  shapeOptions = {
    color: "var(--color-primary)",
    opacity: 1,
    weight: 2,
  },
  ...props
}: DrawOptions.PolygonOptions) {
  const mapDrawHandleIcon = useMapDrawHandleIcon();

  return (
    <MapDrawShapeButton
      drawMode="polygon"
      createDrawTool={(L, map) =>
        new L.Draw.Polygon(map, {
          ...(mapDrawHandleIcon
            ? {
                icon: mapDrawHandleIcon,
                touchIcon: mapDrawHandleIcon,
              }
            : {}),
          drawError,
          shapeOptions,
          ...props,
        })
      }
    >
      <IconPentagon />
    </MapDrawShapeButton>
  );
}

export function MapDrawActionButton<T extends EditToolbar.Edit | EditToolbar.Delete>({
  drawAction,
  createDrawTool,
  controlRef,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  drawAction: MapDrawAction;
  createDrawTool: (L: typeof import("leaflet"), map: DrawMap, featureGroup: L.FeatureGroup) => T;
  controlRef: React.RefObject<T | null>;
}) {
  const drawContext = useMapDrawContext();
  if (!drawContext) throw new Error("MapDrawActionButton must be used within MapDrawControl");

  const { L } = useLeaflet();
  const map = useMap();
  const { featureGroup, activeMode, setActiveMode, layersCount } = drawContext;
  const isActive = activeMode === drawAction;
  const hasFeatures = layersCount > 0;

  useEffect(() => {
    if (!L || !featureGroup || !isActive) {
      controlRef.current?.disable?.();
      controlRef.current = null;
      return;
    }
    const control = createDrawTool(L, map as DrawMap, featureGroup);
    control.enable?.();
    controlRef.current = control;
    return () => {
      control.disable?.();
      controlRef.current = null;
    };
  }, [L, map, isActive, featureGroup, createDrawTool, controlRef]);

  function handleClick() {
    controlRef.current?.save();
    setActiveMode(isActive ? null : drawAction);
  }

  return (
    <Button
      type="button"
      size="icon-sm"
      aria-label={`${drawAction === "edit" ? "Edit" : "Remove"} shapes`}
      title={`${drawAction === "edit" ? "Edit" : "Remove"} shapes`}
      variant={isActive ? "default" : "secondary"}
      disabled={!hasFeatures}
      onClick={handleClick}
      className={cn("border", className)}
      {...props}
    />
  );
}

export function MapDrawEdit({
  selectedPathOptions = {
    color: "var(--color-primary)",
    fillColor: "var(--color-primary)",
    weight: 2,
  },
  ...props
}: Omit<EditToolbar.EditHandlerOptions, "featureGroup">) {
  const { L } = useLeaflet();
  const mapDrawHandleIcon = useMapDrawHandleIcon();
  const drawContext = useMapDrawContext();
  if (!drawContext) {
    throw new Error("MapDrawEdit must be used within MapDrawControl");
  }

  useEffect(() => {
    if (!L || !mapDrawHandleIcon) return;

    L.Edit.PolyVerticesEdit.mergeOptions({
      icon: mapDrawHandleIcon,
      touchIcon: mapDrawHandleIcon,
      drawError: {
        color: "var(--color-destructive)",
      },
    });
    L.Edit.SimpleShape.mergeOptions({
      moveIcon: mapDrawHandleIcon,
      resizeIcon: mapDrawHandleIcon,
      touchMoveIcon: mapDrawHandleIcon,
      touchResizeIcon: mapDrawHandleIcon,
    });
    L.drawLocal.edit.handlers.edit.tooltip = {
      text: "Drag handles or markers to edit.",
      subtext: "",
    };
    L.drawLocal.edit.handlers.remove.tooltip = {
      text: "Click on a shape to remove.",
    };
  }, [L, mapDrawHandleIcon]);

  return (
    <MapDrawActionButton
      drawAction="edit"
      controlRef={drawContext.editControlRef}
      createDrawTool={(L, map, featureGroup) =>
        new L.EditToolbar.Edit(map, {
          featureGroup,
          selectedPathOptions,
          ...props,
        })
      }
    >
      <IconPencil />
    </MapDrawActionButton>
  );
}

export function MapDrawDelete() {
  const drawContext = useMapDrawContext();
  if (!drawContext) {
    throw new Error("MapDrawDelete must be used within MapDrawControl");
  }

  return (
    <MapDrawActionButton
      drawAction="delete"
      controlRef={drawContext.deleteControlRef}
      createDrawTool={(L, map, featureGroup) => new L.EditToolbar.Delete(map, { featureGroup })}
    >
      <IconTrash />
    </MapDrawActionButton>
  );
}

export function MapDrawUndo({ className, ...props }: React.ComponentProps<"button">) {
  const drawContext = useMapDrawContext();
  if (!drawContext) throw new Error("MapDrawUndo must be used within MapDrawControl");

  const { activeMode, setActiveMode, editControlRef, deleteControlRef, layersCount } = drawContext;
  const isInEditMode = activeMode === "edit";
  const isInDeleteMode = activeMode === "delete";
  const isActive = (isInEditMode || isInDeleteMode) && layersCount > 0;

  function handleUndo() {
    if (isInEditMode) {
      editControlRef.current?.revertLayers();
    } else if (isInDeleteMode) {
      deleteControlRef.current?.revertLayers();
    }
    setActiveMode(null);
  }

  return (
    <Button
      type="button"
      size="icon-sm"
      variant="secondary"
      aria-label={`Undo ${activeMode}`}
      title={`Undo ${activeMode}`}
      onClick={handleUndo}
      disabled={!isActive}
      className={cn("border", className)}
      {...props}
    >
      <IconArrowBackUp />
    </Button>
  );
}
