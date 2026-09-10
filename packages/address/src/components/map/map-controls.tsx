"use client";

import { Button } from "@orgatick/ui/components/button";
import { ButtonGroup } from "@orgatick/ui/components/button-group";
import { cn } from "@orgatick/ui/lib/utils";
import { IconLoader2, IconMaximize, IconMinimize, IconMinus, IconNavigation, IconPlus } from "@tabler/icons-react";
import type { ErrorEvent, LatLngExpression, LocateOptions, LocationEvent } from "leaflet";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMap, useMapEvents } from "react-leaflet";
import { MapMarker } from "./map-shapes";
import { PlaceAutocomplete, type PlaceAutocompleteProps } from "./place-autocomplete";
import { useLeaflet } from "./use-leaflet";

export function MapControlContainer({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const { L } = useLeaflet();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!L) return;
    const element = containerRef.current;
    if (!element) return;
    L.DomEvent.disableClickPropagation(element);
    L.DomEvent.disableScrollPropagation(element);
  }, [L]);

  return <div ref={containerRef} className={cn("absolute z-1000 size-fit cursor-default", className)} {...props} />;
}

export function MapZoomControl({
  position = "bottom-1 right-1",
  className,
  ...props
}: React.ComponentProps<typeof ButtonGroup> & { position?: string }) {
  const map = useMap();
  const [zoomLevel, setZoomLevel] = useState(map.getZoom());

  useMapEvents({
    zoomend: () => {
      setZoomLevel(map.getZoom());
    },
  });

  return (
    <MapControlContainer className={cn(position, className)}>
      <ButtonGroup orientation="vertical" {...props}>
        <Button
          type="button"
          size="icon-sm"
          variant="secondary"
          aria-label="Zoom in"
          title="Zoom in"
          onClick={() => map.zoomIn()}
          disabled={zoomLevel >= map.getMaxZoom()}
          className="border"
        >
          <IconPlus />
        </Button>
        <Button
          type="button"
          size="icon-sm"
          variant="secondary"
          aria-label="Zoom out"
          title="Zoom out"
          onClick={() => map.zoomOut()}
          disabled={zoomLevel <= map.getMinZoom()}
          className="border"
        >
          <IconMinus />
        </Button>
      </ButtonGroup>
    </MapControlContainer>
  );
}

export function MapFullscreenControl({
  position = "bottom-1 right-1",
  title = "Toggle fullscreen",
  className,
  ...props
}: React.ComponentProps<typeof Button> & {
  position?: string;
  title?: string;
}) {
  const map = useMap();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { L } = useLeaflet();

  useEffect(() => {
    if (!L) return;

    const fullscreenControl = (
      L.control as unknown as {
        fullscreen: (opts: { position: string; title: Record<string, string> }) => {
          addTo: (m: unknown) => unknown;
          remove: () => void;
        };
      }
    ).fullscreen({
      position: "topleft",
      title: {
        false: title,
        true: title,
      },
    });

    const container = map.getContainer();
    const handleEnter = () => setIsFullscreen(true);
    const handleExit = () => setIsFullscreen(false);

    container.addEventListener("fullscreenchange", () => {
      if (document.fullscreenElement === container) {
        handleEnter();
      } else {
        handleExit();
      }
    });

    return () => {
      fullscreenControl.remove();
    };
  }, [L, map, title]);

  return (
    <MapControlContainer className={cn(position, className)}>
      <Button
        type="button"
        size="icon-sm"
        variant="secondary"
        aria-label={title}
        title={title}
        onClick={() => {
          if (isFullscreen) {
            document.exitFullscreen();
          } else {
            map.getContainer().requestFullscreen();
          }
        }}
        className="border"
        {...props}
      >
        {isFullscreen ? <IconMinimize /> : <IconMaximize />}
      </Button>
    </MapControlContainer>
  );
}

export function MapLocatePulseIcon() {
  return (
    <span className="relative flex size-4 items-center justify-center">
      <span className="bg-primary absolute inline-flex size-full animate-ping rounded-full opacity-75" />
      <span className="bg-primary relative inline-flex size-3 rounded-full border-2 border-white" />
    </span>
  );
}

export function MapLocateControl({
  position = "bottom-1 right-1",
  locateOptions = { maxZoom: 16 },
  onLocationFound,
  onLocationError,
  className,
  ...props
}: React.ComponentProps<typeof Button> & {
  position?: string;
  locateOptions?: LocateOptions;
  onLocationFound?: (latlng: LatLngExpression) => void;
  onLocationError?: (error: ErrorEvent) => void;
}) {
  const map = useMap();
  const [isLocating, setIsLocating] = useState(false);
  const [location, setLocation] = useState<LatLngExpression | null>(null);

  const stopLocating = useCallback(() => {
    map.stopLocate();
    map.off("locationfound");
    map.off("locationerror");
    setIsLocating(false);
    setLocation(null);
  }, [map]);

  const startLocating = useCallback(() => {
    setIsLocating(true);
    map.locate({ setView: true, maxZoom: 16, ...locateOptions });

    map.once("locationfound", (e: LocationEvent) => {
      setIsLocating(false);
      setLocation(e.latlng);
      onLocationFound?.(e.latlng);
    });

    map.once("locationerror", (e: ErrorEvent) => {
      setIsLocating(false);
      setLocation(null);
      onLocationError?.(e);
    });
  }, [map, locateOptions, onLocationFound, onLocationError]);

  useEffect(() => {
    return () => {
      stopLocating();
    };
  }, [stopLocating]);

  return (
    <MapControlContainer className={cn(position, className)}>
      <Button
        type="button"
        size="icon-sm"
        variant={location ? "default" : "secondary"}
        onClick={location ? stopLocating : startLocating}
        disabled={isLocating}
        title={isLocating ? "Locating..." : location ? "Stop tracking" : "Track location"}
        aria-label={isLocating ? "Locating..." : location ? "Stop location tracking" : "Start location tracking"}
        className="border"
        {...props}
      >
        {isLocating ? <IconLoader2 className="animate-spin" /> : <IconNavigation />}
      </Button>
      {location && <MapMarker position={location} icon={<MapLocatePulseIcon />} />}
    </MapControlContainer>
  );
}

export function MapSearchControl({
  position = "top-1 left-1",
  className,
  ...props
}: PlaceAutocompleteProps & { position?: string }) {
  return (
    <MapControlContainer className={cn("z-1001 w-60", position, className)}>
      <PlaceAutocomplete {...props} />
    </MapControlContainer>
  );
}
