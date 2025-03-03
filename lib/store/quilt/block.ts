import { create } from "zustand";
import { persist } from "zustand/middleware";

import { BLOCK_PALETTE_COLORS as COLORS } from "@/data/constants";

interface CellProps {
  colors: string[];
  onSubCellClick: (index: number) => void;
}

export type SubdivisionType =
  | "single"
  | "diagonal"
  | "diagonalQuadrant"
  | "triangle"
  | "subdivided";

interface Pattern {
  type: SubdivisionType;
  colors?: string[];
}

interface QuiltState {
  gridSize: number;
  pattern: Pattern[];
  selectedColor: string;
  subdivisionType: SubdivisionType;
  setGridSize: (size: number) => void;
  setPattern: (pattern: Pattern[]) => void;
  setSelectedColor: (color: string) => void;
  setSubdivisionType: (type: SubdivisionType) => void;
  generatePattern: () => Promise<void>;
  clearPattern: () => void;
  subdivide: (index: number) => void;
}

export const useQuiltStore = create<QuiltState>()(
  persist(
    (set, get) => ({
      gridSize: 8,
      pattern: [] as Pattern[],
      selectedColor: COLORS[0],
      subdivisionType: "subdivided",
      setGridSize: (size: number) => set({ gridSize: size }),
      setPattern: (pattern: Pattern[]) => set({ pattern: pattern }),
      setSelectedColor: (color: string) => set({ selectedColor: color }),
      setSubdivisionType: (type: SubdivisionType) =>
        set({ subdivisionType: type }),
      generatePattern: async () => {
        const gridSize = get().gridSize;
        const response = await fetch("/api/block/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ gridSize }),
        });
        const newPattern = (await response.json()) as Pattern[];
        set({ pattern: newPattern });
      },
      clearPattern: () => {
        const gridSize = get().gridSize;
        set({
          pattern: Array(gridSize * gridSize).fill({
            type: "single",
            colors: ["#FFFFFFFF"],
          }),
        });
      },
      subdivide: (cellIndex: number, subdivisionIndex = 0) => {
        const newPattern = [...get().pattern];
        const type: SubdivisionType = get().subdivisionType;

        if (type === "single") {
          return;
        }

        if (type === "diagonal") {
          newPattern[cellIndex] = {
            type,
            colors: Array(2).fill(COLORS[subdivisionIndex]),
          };
        } else if (type === "diagonalQuadrant") {
          const colors = Array(4).fill("#FFFFFFFF");
          colors[subdivisionIndex] = COLORS[subdivisionIndex];

          newPattern[cellIndex] = {
            type,
            colors,
          };
        }

        set({ pattern: newPattern });
      },
    }),
    { name: "quilt" }
  )
);
