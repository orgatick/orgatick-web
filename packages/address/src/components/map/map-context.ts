"use client";

import { createContext, useContext } from "react";
import type { MapDrawContextType, MapLayersContextType } from "./types";

export const MapLayersContext = createContext<MapLayersContextType | null>(null);

export function useMapLayersContext() {
  return useContext(MapLayersContext);
}

export const MapDrawContext = createContext<MapDrawContextType | null>(null);

export function useMapDrawContext() {
  return useContext(MapDrawContext);
}
