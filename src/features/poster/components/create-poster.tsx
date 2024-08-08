"use client";

import { Canvas } from "@/features/canvas/components/canvas";
import { CanvasProvider } from "@/features/canvas/hooks/use-canvas-context";
import type { Meetup } from "@prisma/client";

type Props = {
  meetup: Meetup;
  imageUrl: string;
};

export const CreatePoster = ({ meetup, imageUrl }: Props) => {
  return (
    <CanvasProvider>
      <Canvas imageUrl={imageUrl} />
    </CanvasProvider>
  );
};
