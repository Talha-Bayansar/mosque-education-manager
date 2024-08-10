"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import {
  Camera,
  CanvasMode,
  CanvasState,
  Color,
  LayerType,
  Point,
  Side,
  StoredLayer,
  XYWH,
} from "../types";
import { SelectionBox } from "./selection-box";
import {
  connectionIdToColor,
  findIntersectingLayersWithRectangle,
  pointerEventToCanvasPoint,
  resizeBounds,
} from "../lib/utils";
import { useCanvasContext } from "../hooks/use-canvas-context";
import { nanoid } from "nanoid";
// import { useDeleteLayers } from "../hooks/use-delete-layers";
import { LayerPreview } from "./layer-preview";
import { Toolbar } from "./toolbar";
import { cn } from "@/lib/utils";

const MAX_LAYERS = 100;

type Props = {
  imageUrl: string;
};

export const Canvas = ({ imageUrl }: Props) => {
  const { layers, setLayers, selection, setSelection } = useCanvasContext()!;
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const layerIdsToColorSelection = useMemo(() => {
    const layerIdsToColorSelection: Record<string, string> = {};

    for (const layerId of selection) {
      layerIdsToColorSelection[layerId] = connectionIdToColor();
    }

    return layerIdsToColorSelection;
  }, [selection]);
  const posterRef = useRef<SVGGElement>(null);

  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 255,
    g: 255,
    b: 255,
  });

  const insertLayer = useCallback(
    (
      layerType:
        | LayerType.Ellipse
        | LayerType.Rectangle
        | LayerType.Text
        | LayerType.Note,
      position: Point
    ) => {
      if (layers.length >= MAX_LAYERS) {
        return;
      }

      const layerId = nanoid();

      const layer: StoredLayer = {
        id: layerId,
        type: layerType,
        x: position.x,
        y: position.y,
        width: 100,
        height: 100,
        fill: lastUsedColor,
      };

      setLayers((layers) => [...layers, layer]);

      setCanvasState({
        mode: CanvasMode.None,
      });
    },
    [lastUsedColor]
  );

  const translateSelectedLayer = useCallback(
    (point: Point) => {
      if (canvasState.mode !== CanvasMode.Translating) return;

      const offset = {
        x: point.x - canvasState.current.x,
        y: point.y - canvasState.current.y,
      };

      for (const id of selection) {
        const layer = layers.find((layer) => layer.id === id);
        if (layer) {
          setLayers((layers) =>
            layers.map((layer) =>
              layer.id === id
                ? { ...layer, x: layer.x + offset.x, y: layer.y + offset.y }
                : layer
            )
          );
        }
      }

      setCanvasState({
        mode: CanvasMode.Translating,
        current: point,
      });
    },
    [canvasState]
  );

  const unselectLayer = useCallback(() => {
    if (selection.length > 0) {
      setSelection([]);
    }
  }, [selection]);

  const updateSelectionNet = useCallback(
    (current: Point, origin: Point) => {
      setCanvasState({
        mode: CanvasMode.SelectionNet,
        origin,
        current,
      });
      const layerIds = layers.map((layer) => layer.id);

      const ids = findIntersectingLayersWithRectangle(
        layerIds,
        layers,
        origin,
        current
      );

      setSelection(ids);
    },
    [layers]
  );

  const startMultiSelection = useCallback((current: Point, origin: Point) => {
    if (Math.abs(current.x - origin.x) + Math.abs(current.y - origin.y) > 5) {
      setCanvasState({
        mode: CanvasMode.SelectionNet,
        origin,
        current,
      });
    }
  }, []);

  const resizeSelectedLayer = useCallback(
    (point: Point) => {
      if (canvasState.mode !== CanvasMode.Resizing) {
        return;
      }

      const bounds = resizeBounds(
        canvasState.initialBounds,
        canvasState.corner,
        point
      );
      const layer = layers.find((layer) => layer.id === selection[0]);

      if (layer) {
        setLayers((layers) =>
          layers.map((l) =>
            l.id === layer.id ? { ...layer, ...bounds } : layer
          )
        );
      }
    },
    [canvasState]
  );

  const handleResizeHandlePointerDown = useCallback(
    (corner: Side, initialBounds: XYWH) => {
      setCanvasState({
        mode: CanvasMode.Resizing,
        initialBounds,
        corner,
      });
    },
    []
  );

  const handleWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();

      const current = pointerEventToCanvasPoint(e, camera);

      if (canvasState.mode == CanvasMode.Pressing) {
        startMultiSelection(current, canvasState.origin);
      } else if (canvasState.mode === CanvasMode.SelectionNet) {
        updateSelectionNet(current, canvasState.origin);
      } else if (canvasState.mode === CanvasMode.Translating) {
        translateSelectedLayer(current);
      } else if (canvasState.mode === CanvasMode.Resizing) {
        resizeSelectedLayer(current);
      } else if (canvasState.mode === CanvasMode.Pencil) {
        // continueDrawing(current, e);
      }
    },
    [
      canvasState,
      resizeSelectedLayer,
      camera,
      translateSelectedLayer,
      // continueDrawing,
      startMultiSelection,
      updateSelectionNet,
    ]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      const point = pointerEventToCanvasPoint(e, camera);

      if (canvasState.mode === CanvasMode.Inserting) return;

      setCanvasState({
        origin: point,
        mode: CanvasMode.Pressing,
      });
    },
    [camera, canvasState.mode, setCanvasState]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      const point = pointerEventToCanvasPoint(e, camera);

      if (
        canvasState.mode === CanvasMode.None ||
        canvasState.mode === CanvasMode.Pressing
      ) {
        unselectLayer();
        setCanvasState({
          mode: CanvasMode.None,
        });
      } else if (canvasState.mode === CanvasMode.Inserting) {
        insertLayer(canvasState.layerType, point);
      } else {
        setCanvasState({
          mode: CanvasMode.None,
        });
      }
    },
    [camera, canvasState, insertLayer, unselectLayer, setCanvasState]
  );

  const handleLayerPointerDown = useCallback(
    (e: React.PointerEvent, layerId: string) => {
      if (
        canvasState.mode === CanvasMode.Pencil ||
        canvasState.mode === CanvasMode.Inserting
      ) {
        return;
      }
      e.stopPropagation();

      const point = pointerEventToCanvasPoint(e, camera);

      if (!selection.includes(layerId)) {
        setSelection([layerId]);
      }

      setCanvasState({
        mode: CanvasMode.Translating,
        current: point,
      });
    },
    [setCanvasState, camera, canvasState.mode]
  );

  // const deleteLayers = useDeleteLayers();

  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none grid place-items-center">
      {/* <Info boardId={boardId} />
      <Participants /> */}
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        posterRef={posterRef}
      />
      {/* <SelectionTools camera={camera} setLastUsedColor={setLastUsedColor} /> */}
      <svg
        className="w-[100vw] h-[100vh]"
        onWheel={handleWheel}
        onPointerMove={handlePointerMove}
        // onPointerLeave={handlePointerLeave}
        onPointerUp={handlePointerUp}
        onPointerDown={handlePointerDown}
      >
        <g
          style={{
            transform: `translate(${camera.x}px, ${camera.y}px)`,
          }}
        >
          <g ref={posterRef}>
            <image
              href={imageUrl}
              className={cn({
                "h-full": window.innerHeight < window.innerWidth,
                "w-full": window.innerHeight > window.innerWidth,
              })}
            />
            {layers.map((layer) => (
              <LayerPreview
                key={layer.id}
                id={layer.id}
                onLayerPointerDown={handleLayerPointerDown}
                selectionColor={layerIdsToColorSelection[layer.id]}
              />
            ))}
          </g>
          <SelectionBox
            onResizeHandlePointerDown={handleResizeHandlePointerDown}
          />
          {canvasState.mode === CanvasMode.SelectionNet &&
            canvasState.current && (
              <rect
                className="fill-blue-500/5 stroke-blue-500 stroke-1"
                x={Math.min(canvasState.origin.x, canvasState.current.x)}
                y={Math.min(canvasState.origin.y, canvasState.current.y)}
                width={Math.abs(canvasState.origin.x - canvasState.current.x)}
                height={Math.abs(canvasState.origin.y - canvasState.current.y)}
              />
            )}
        </g>
      </svg>
    </main>
  );
};
