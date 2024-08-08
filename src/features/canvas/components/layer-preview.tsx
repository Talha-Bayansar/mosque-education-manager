"use client";
import { memo } from "react";
import { useCanvasContext } from "../hooks/use-canvas-context";
import { LayerType } from "../types";
import { Text } from "./text";

interface LayerPreviewProps {
  id: string;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor: string;
}

export const LayerPreview = memo(
  ({ id, onLayerPointerDown, selectionColor }: LayerPreviewProps) => {
    const { layers } = useCanvasContext()!;
    const layer = layers.find((layer) => layer.id === id);

    if (!layer) return null;

    switch (layer.type) {
      //   case LayerType.Path:
      //     return (
      //       <Path
      //         points={layer.points}
      //         onPointerDown={(e) => onLayerPointerDown(e, id)}
      //         x={layer.x}
      //         y={layer.y}
      //         fill={layer.fill ? colorToCss(layer.fill) : "#000"}
      //         stroke={selectionColor}
      //       />
      //     );
      //   case LayerType.Note:
      //     return (
      //       <Note
      //         id={id}
      //         layer={layer}
      //         onPointerDown={onLayerPointerDown}
      //         selectionColor={selectionColor}
      //       />
      //     );
      case LayerType.Text:
        return (
          <Text
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
      //   case LayerType.Ellipse:
      //     return (
      //       <Ellipse
      //         id={id}
      //         layer={layer}
      //         onPointerDown={onLayerPointerDown}
      //         selectionColor={selectionColor}
      //       />
      //     );
      //   case LayerType.Rectangle:
      //     return (
      //       <Rectangle
      //         id={id}
      //         layer={layer}
      //         onPointerDown={onLayerPointerDown}
      //         selectionColor={selectionColor}
      //       />
      //     );

      default:
        console.warn("Unknown layer type", layer);
        return null;
    }
  }
);

LayerPreview.displayName = "LayerPreview";
