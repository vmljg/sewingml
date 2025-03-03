"use client";
import { useEffect } from "react";
import { BLOCK_PALETTE_COLORS as COLORS } from "@/data/constants";
import "./quilt-block.css";
import { SubdivisionType, useQuiltStore } from "@/lib/store/quilt/block";
import {
  DiagonalQuadrantSubdividedCell,
  DiagonalSubdividedCell,
  SubdividedCell,
  TriangleSubdividedCell,
} from "@/components/cells";
import { Button } from "@/components/button";
import { cn } from "@/lib/utils";

export default function QuiltBlockDesignPage() {
  const {
    gridSize,
    pattern,
    selectedColor,
    subdivisionType,
    setGridSize,
    setPattern,
    setSelectedColor,
    setSubdivisionType,
    generatePattern,
    clearPattern,
    subdivide,
  } = useQuiltStore();

  useEffect(() => {
    setPattern(
      Array(gridSize * gridSize).fill({ type: "single", color: "#FFFFFF" })
    );
  }, [gridSize, setPattern]);

  const handleCellClick = (index: number) => {
    subdivide(index);
  };

  const handleSubCellClick = (cellIndex: number, subCellIndex: number) => {
    const newPattern = [...pattern];

    if (!newPattern[cellIndex].colors) {
      return;
    }

    newPattern[cellIndex].colors[subCellIndex] = selectedColor;
    setPattern(newPattern);
  };

  const handleExportSVG = async () => {
    const response = await fetch("/api/block/export", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pattern, gridSize }),
    });
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "quilt_pattern.svg";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="container">
      <h1>Quilt Pattern Creator</h1>
      <div className="controls">
        <label>
          Grid Size:
          <input
            type="number"
            min="2"
            max="24"
            value={gridSize}
            onChange={(e) => setGridSize(Number(e.target.value))}
          />
        </label>
        <Button type="button" onClick={generatePattern}>
          Generate Pattern
        </Button>
        <Button type="button" onClick={clearPattern}>
          Clear
        </Button>
        <div>
          Subdivision Type:
          <select
            value={subdivisionType}
            onChange={(e) => {
              setSubdivisionType(e.target.value as SubdivisionType);
            }}
          >
            <option value="subdivided">Subdivided</option>
            <option value="diagonal">Diagonal</option>
            <option value="diagonalQuadrant">Diagonal Quadrant</option>
            <option value="triangle">Triangle</option>
          </select>
        </div>
        <Button type="button" onClick={handleExportSVG}>
          Export SVG
        </Button>
      </div>
      <div className="grid grid-flow-col">
        {COLORS.map((color) => (
          <div
            key={color}
            className={cn("size-8 rounded-xl", {
              "ring-1": selectedColor === color,
            })}
            style={{ backgroundColor: color }}
            onClick={() => setSelectedColor(color)}
          ></div>
        ))}
      </div>
      <div
        className="grid border-collapse divide-x divide-y border-t border-l"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        }}
      >
        {pattern.map((cell, index) => {
          if (cell.type === "single") {
            return (
              <div
                key={index}
                className="cell"
                style={{ backgroundColor: cell.colors?.[0] ?? "#FFFFFF" }}
                onClick={() => handleCellClick(index)}
              ></div>
            );
          }

          if (cell.type === "subdivided") {
            return (
              <SubdividedCell
                key={index}
                colors={cell.colors ?? []}
                onSubCellClick={(subIndex) =>
                  handleSubCellClick(index, subIndex)
                }
              />
            );
          }

          if (cell.type === "diagonal") {
            return (
              <DiagonalSubdividedCell
                key={index}
                colors={cell.colors ?? []}
                onSubCellClick={(subIndex) =>
                  handleSubCellClick(index, subIndex)
                }
              />
            );
          }
          if (cell.type === "diagonalQuadrant") {
            return (
              <DiagonalQuadrantSubdividedCell
                key={index}
                colors={cell.colors ?? []}
                onSubCellClick={(subIndex) =>
                  handleSubCellClick(index, subIndex)
                }
              />
            );
          }

          if (cell.type === "triangle") {
            return (
              <TriangleSubdividedCell
                key={index}
                colors={cell.colors ?? []}
                onSubCellClick={(subIndex) =>
                  handleSubCellClick(index, subIndex)
                }
              />
            );
          }
        })}
      </div>
    </div>
  );
}
