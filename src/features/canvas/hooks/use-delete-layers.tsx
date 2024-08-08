import { useCallback } from "react";
import { useCanvasContext } from "./use-canvas-context";

export const useDeleteLayers = () => {
  const { selection, setLayers, setSelection } = useCanvasContext()!;

  return useCallback(() => {
    for (const id of selection) {
      setLayers((layers) => {
        return layers.filter((layer) => layer.id !== id);
      });
    }

    setSelection([]);
  }, [selection]);
};
