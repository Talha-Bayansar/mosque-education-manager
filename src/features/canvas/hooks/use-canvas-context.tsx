"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { StoredLayer } from "../types";

type Props = { children: React.ReactNode };

const CanvasContext = createContext<
  | {
      selection: string[];
      setSelection: Dispatch<SetStateAction<string[]>>;
      layers: StoredLayer[];
      setLayers: Dispatch<SetStateAction<StoredLayer[]>>;
    }
  | undefined
>(undefined);

export const CanvasProvider = ({ children }: Props) => {
  const [selection, setSelection] = useState<string[]>([]);
  const [layers, setLayers] = useState<StoredLayer[]>([]);

  const api = { selection, setSelection, layers, setLayers };
  return (
    <CanvasContext.Provider value={api}>{children}</CanvasContext.Provider>
  );
};

export const useCanvasContext = () => useContext(CanvasContext);
