import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface TriangleData {
  color: string
  split: boolean
  leftColor: string
  rightColor: string
}

export interface TriangleState {
  gridSize: number
  triangles: TriangleData[][][]
  setGridSize: (size: number) => void
  setTriangleColor: (row: number, col: number, triangleIndex: number, color: string) => void
  toggleTriangleSplit: (row: number, col: number, triangleIndex: number) => void
  setTriangleHalfColor: (row: number, col: number, triangleIndex: number, isLeft: boolean, color: string) => void
}

const initialTriangleData: TriangleData = {
  color: "white",
  split: false,
  leftColor: "white",
  rightColor: "white",
}

const createInitialTriangles = (size: number) =>
  Array(size)
    .fill(null)
    .map(() =>
      Array(size)
        .fill(null)
        .map(() =>
          Array(8)
            .fill(null)
            .map(() => ({ ...initialTriangleData })),
        ),
    )

export const useTriangleStore = create<TriangleState>()(
  persist(
    (set) => ({
      gridSize: 1,
      triangles: createInitialTriangles(1),
      setGridSize: (size) =>
        set((state) => {
          const newTriangles = createInitialTriangles(size)
          // Copy existing data
          for (let i = 0; i < Math.min(state.gridSize, size); i++) {
            for (let j = 0; j < Math.min(state.gridSize, size); j++) {
              newTriangles[i][j] = state.triangles[i][j]
            }
          }
          return { gridSize: size, triangles: newTriangles }
        }),
      setTriangleColor: (row, col, triangleIndex, color) =>
        set((state) => {
          const newTriangles = [...state.triangles]
          newTriangles[row][col][triangleIndex] = {
            ...newTriangles[row][col][triangleIndex],
            color,
          }
          return { triangles: newTriangles }
        }),
      toggleTriangleSplit: (row, col, triangleIndex) =>
        set((state) => {
          const newTriangles = [...state.triangles]
          const triangle = newTriangles[row][col][triangleIndex]
          triangle.split = !triangle.split
          if (!triangle.split) {
            triangle.leftColor = triangle.color
            triangle.rightColor = triangle.color
          }
          return { triangles: newTriangles }
        }),
      setTriangleHalfColor: (row, col, triangleIndex, isLeft, color) =>
        set((state) => {
          const newTriangles = [...state.triangles]
          const triangle = newTriangles[row][col][triangleIndex]
          if (isLeft) {
            triangle.leftColor = color
          } else {
            triangle.rightColor = color
          }
          return { triangles: newTriangles }
        }),
    }),
    {
      name: "triangle-grid-storage",
    },
  ),
)

