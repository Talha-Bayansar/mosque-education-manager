import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// TAILWIND UTILITY FUNCTIONS
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ARRAY UTILITY FUNCTIONS
export const isArrayEmpty = (array: unknown[] | undefined | null) => {
  if (!array) return true;

  return array.length < 1;
};

export const generateArray = (size: number = 10) => {
  return Array.from({ length: size }, (_, i) => i);
};

export const isLastOfArray = (index: number, array: unknown[]) => {
  return index === array.length - 1;
};
