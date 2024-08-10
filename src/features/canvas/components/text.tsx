import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { TextLayer } from "../types";
import { useCanvasContext } from "../hooks/use-canvas-context";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

interface TextProps {
  id: string;
  layer: TextLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

export const Text = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: TextProps) => {
  const { setLayers, selection } = useCanvasContext()!;
  const { x, y, width, height, fill, value } = layer;
  const [fontStyle, setFontStyle] = useState({
    fontSize: 16,
    fontWeight: 400,
    color: "#FFFFFF",
  });

  const updateValue = useCallback((newValue: string) => {
    setLayers((layers) =>
      layers.map((layer) =>
        layer.id === id ? { ...layer, value: newValue } : layer
      )
    );
  }, []);

  const hanldeContentChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value);
  };

  return (
    <Popover open={selection.includes(id) && selection.length < 2}>
      <PopoverTrigger asChild>
        <foreignObject
          x={x}
          y={y}
          height={height}
          width={width}
          onPointerDown={(e) => onPointerDown(e, id)}
          style={{
            outline: selectionColor ? `1px solid ${selectionColor}` : "none",
          }}
        >
          <ContentEditable
            html={value || "Text"}
            onChange={hanldeContentChange}
            className={cn(
              "h-full w-full flex items-center justify-center drop-shadow-md outline-none"
            )}
            style={{
              color: fontStyle.color,
              fontSize: fontStyle.fontSize,
              fontWeight: fontStyle.fontWeight,
            }}
          />
        </foreignObject>
      </PopoverTrigger>
      <PopoverContent
        onPointerDown={(e) => onPointerDown(e, id)}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="fontSize">Font size</Label>
          <Input
            name="fontSize"
            type="number"
            value={fontStyle.fontSize}
            inputMode="numeric"
            step={4}
            onChange={(e) =>
              setFontStyle((value) => ({
                ...value,
                fontSize: Number(e.target.value),
              }))
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="fontWeight">Font weight</Label>
          <Input
            name="fontWeight"
            type="number"
            value={fontStyle.fontWeight}
            inputMode="numeric"
            min={100}
            max={900}
            step={100}
            onChange={(e) =>
              setFontStyle((value) => ({
                ...value,
                fontWeight: Number(e.target.value),
              }))
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="fontWeight">Color</Label>
          <div className="flex gap-2 flex-wrap">
            {["#FFFFFF", "#000000"].map((color) => (
              <button
                key={color}
                className="h-6 w-6 cursor-pointer border rounded-sm"
                style={{ backgroundColor: color }}
                onClick={() => setFontStyle((style) => ({ ...style, color }))}
              />
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
