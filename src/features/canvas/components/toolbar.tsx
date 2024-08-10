import { CanvasMode, CanvasState, LayerType } from "@/features/canvas/types";
import { Download, MousePointer2, Type } from "lucide-react";
import { ToolButton } from "./tool-button";
import { RefObject } from "react";
import { useTranslations } from "next-intl";

interface ToolbarProps {
  canvasState: CanvasState;
  setCanvasState: (newState: CanvasState) => void;
  posterRef: RefObject<SVGGElement>;
}

export const Toolbar = ({
  canvasState,
  setCanvasState,
  posterRef,
}: ToolbarProps) => {
  const t = useTranslations();

  const handleDownload = async () => {};

  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4">
      <div className="bg-white rounded-md p-1.5 flex gap-1 flex-col items-center shadow-md">
        <ToolButton
          label={t("select")}
          icon={MousePointer2}
          onClick={() => setCanvasState({ mode: CanvasMode.None })}
          isActive={
            canvasState.mode === CanvasMode.None ||
            canvasState.mode === CanvasMode.Translating ||
            canvasState.mode === CanvasMode.SelectionNet ||
            canvasState.mode === CanvasMode.Pressing ||
            canvasState.mode === CanvasMode.Resizing
          }
        />
        <ToolButton
          label={t("text")}
          icon={Type}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Text,
            })
          }
          isActive={
            canvasState.mode === CanvasMode.Inserting &&
            canvasState.layerType === LayerType.Text
          }
        />
        <ToolButton
          label={t("download")}
          icon={Download}
          onClick={() => handleDownload()}
          isActive={false}
        />
      </div>
    </div>
  );
};

export function ToolbarSkeleton() {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 bg-white h-[360px] w-[52px] shadow-md rounded-md" />
  );
}
