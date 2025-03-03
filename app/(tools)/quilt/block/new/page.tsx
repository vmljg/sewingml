"use client"

import type React from "react"

import { useState } from "react"
import { useTriangleStore } from "@/lib/store/triangles"
import { Menu } from "lucide-react"
import { Triangle, SplitTriangle } from "./TriangleComponents"

const DEFAULT_COLORS = ["#FF6B6B", "#4ECDC4", "#FFD166", "#06D6A0", "#118AB2", "#073B4C", "#8338EC", "#3A86FF"]

export default function Triangles() {
  const { gridSize, triangles, setGridSize, setTriangleColor, toggleTriangleSplit, setTriangleHalfColor } =
    useTriangleStore()
  const [selectedColor, setSelectedColor] = useState(DEFAULT_COLORS[0])
  const [menuOpen, setMenuOpen] = useState(false)

  const handleGridSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = Number.parseInt(e.target.value, 10)
    if (newSize >= 1 && newSize <= 5) {
      setGridSize(newSize)
    }
  }

  const handleTriangleClick = (row: number, col: number, triangleIndex: number, isLeft?: boolean) => {
    if (triangles[row][col][triangleIndex].split && isLeft !== undefined) {
      setTriangleHalfColor(row, col, triangleIndex, isLeft, selectedColor)
    } else {
      setTriangleColor(row, col, triangleIndex, selectedColor)
    }
  }

  const handleTriangleRightClick = (e: React.MouseEvent, row: number, col: number, triangleIndex: number) => {
    e.preventDefault()
    toggleTriangleSplit(row, col, triangleIndex)
  }

  const getCellColorSummary = (cell: (typeof triangles)[0][0]) => {
    return cell
      .map((triangle, index) => {
        if (triangle.split) {
          return `T${index + 1}: ${triangle.leftColor}/${triangle.rightColor}`
        }
        return `T${index + 1}: ${triangle.color}`
      })
      .join(", ")
  }

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <div className="flex justify-between w-full max-w-5xl">
        <div className="flex space-x-4 items-center">
          <label htmlFor="gridSize" className="font-medium">
            Grid Size:
          </label>
          <input
            type="number"
            id="gridSize"
            min="1"
            max="5"
            value={gridSize}
            onChange={handleGridSizeChange}
            className="border rounded px-2 py-1 w-16"
          />
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded-full hover:bg-gray-200"
          aria-label="Toggle color summary menu"
        >
          <Menu size={24} />
        </button>
      </div>

      <div className="relative w-full max-w-5xl">
        <div className="grid" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
          {triangles.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <TriangleSquare
                key={`${rowIndex}-${colIndex}`}
                triangles={cell}
                onTriangleClick={(triangleIndex, isLeft) =>
                  handleTriangleClick(rowIndex, colIndex, triangleIndex, isLeft)
                }
                onTriangleRightClick={(e, triangleIndex) =>
                  handleTriangleRightClick(e, rowIndex, colIndex, triangleIndex)
                }
              />
            )),
          )}
        </div>

        {menuOpen && (
          <div className="absolute top-full left-0 right-0 mt-4 bg-white border rounded shadow-lg p-4 max-h-96 overflow-y-auto">
            <h2 className="font-bold mb-2">Color Summary</h2>
            <ul>
              {triangles.flatMap((row, rowIndex) =>
                row.map((cell, colIndex) => (
                  <li key={`${rowIndex}-${colIndex}`} className="mb-2">
                    <span className="font-medium">
                      Cell ({rowIndex + 1}, {colIndex + 1}):
                    </span>{" "}
                    {getCellColorSummary(cell)}
                  </li>
                )),
              )}
            </ul>
          </div>
        )}
      </div>

      <div className="flex space-x-2">
        {DEFAULT_COLORS.map((color) => (
          <button
            key={color}
            className={`w-8 h-8 rounded-full ${selectedColor === color ? "ring-2 ring-offset-2 ring-black" : ""}`}
            style={{ backgroundColor: color }}
            onClick={() => setSelectedColor(color)}
          />
        ))}
      </div>
    </div>
  )
}

interface TriangleSquareProps {
  triangles: Array<{
    color: string
    split: boolean
    leftColor: string
    rightColor: string
  }>
  onTriangleClick: (index: number, isLeft?: boolean) => void
  onTriangleRightClick: (e: React.MouseEvent, index: number) => void
}

function TriangleSquare({ triangles, onTriangleClick, onTriangleRightClick }: TriangleSquareProps) {
  const size = 320;

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`} className="border border-gray-300">
      {triangles.map((triangle, index) =>
        triangle.split ? (
          <SplitTriangle
            key={index}
            index={index}
            leftColor={triangle.leftColor}
            rightColor={triangle.rightColor}
            size={size}
            onLeftClick={() => onTriangleClick(index, true)}  // Left half
            onRightClick={(e) => onTriangleRightClick(e, index)}
          />
        ) : (
          <Triangle
            key={index}
            index={index}
            color={triangle.color}
            size={size}
            onClick={() => onTriangleClick(index)}
            onRightClick={(e) => onTriangleRightClick(e, index)}
          />
        )
      )}
    </svg>
  );
}

