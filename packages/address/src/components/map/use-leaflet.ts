"use client";

import { useEffect, useRef, useState } from "react";

export function useLeaflet() {
  const [L, setL] = useState<typeof import("leaflet") | null>(null);
  const [LeafletDraw, setLeafletDraw] = useState<typeof import("leaflet-draw") | null>(null);

  useEffect(() => {
    let isSubscribed = true;

    async function loadLeaflet() {
      const leaflet = await import("leaflet");
      const leafletFullscreen = await import("leaflet.fullscreen");
      const leafletDraw = await import("leaflet-draw");

      const L_object = leaflet.default;
      if (L_object.Control && !(L_object.Control as unknown as Record<string, unknown>).FullScreen) {
        const fullscreenModule = leafletFullscreen as unknown as {
          default?: unknown;
        };
        (L_object.Control as unknown as Record<string, unknown>).FullScreen =
          fullscreenModule.default || leafletFullscreen;
      }

      if (isSubscribed) {
        setLeafletDraw(leafletDraw);
        setL(L_object);
      }
    }

    if (L && LeafletDraw) return;
    if (typeof window === "undefined") return;

    loadLeaflet();

    return () => {
      isSubscribed = false;
    };
  }, [L, LeafletDraw]);

  return { L, LeafletDraw };
}

export function useDebounceLoadingState(delay = 200) {
  const [isLoading, setIsLoading] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isLoading) {
      timeoutRef.current = setTimeout(() => {
        setShowLoading(true);
      }, delay);
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setShowLoading(false);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isLoading, delay]);

  return [showLoading, setIsLoading] as const;
}
