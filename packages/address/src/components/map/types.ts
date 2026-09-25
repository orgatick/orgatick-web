import type { DropdownMenuCheckboxItem } from "@orgatick/ui/components/dropdown-menu";
import type * as L from "leaflet";
import type { EditToolbar } from "leaflet";
import type * as React from "react";

export interface MapTileLayerOption {
  name: string;
  url: string;
  attribution: string;
}

export interface MapLayerGroupOption extends Pick<React.ComponentProps<typeof DropdownMenuCheckboxItem>, "disabled"> {
  name: string;
}

export interface MapLayersContextType {
  registerTileLayer: (tileLayer: MapTileLayerOption) => void;
  tileLayers: MapTileLayerOption[];
  selectedTileLayer: string;
  setSelectedTileLayer: (name: string) => void;
  registerLayerGroup: (layerGroup: MapLayerGroupOption) => void;
  layerGroups: MapLayerGroupOption[];
  activeLayerGroups: string[];
  setActiveLayerGroups: React.Dispatch<React.SetStateAction<string[]>>;
}

export type MapDrawShape = "marker" | "polyline" | "circle" | "rectangle" | "polygon";
export type MapDrawAction = "edit" | "delete";
export type MapDrawMode = MapDrawShape | MapDrawAction | null;

export interface MapDrawContextType {
  readonly featureGroup: L.FeatureGroup | null;
  activeMode: MapDrawMode;
  setActiveMode: (mode: MapDrawMode) => void;
  readonly editControlRef: React.RefObject<EditToolbar.Edit | null>;
  readonly deleteControlRef: React.RefObject<EditToolbar.Delete | null>;
  readonly layersCount: number;
}
