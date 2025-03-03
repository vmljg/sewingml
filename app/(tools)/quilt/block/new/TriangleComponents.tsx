import type React from "react"
import { generateTrianglePath, generateSplitTrianglePaths } from "./triangleUtils"

interface TriangleProps {
  index: number
  color: string
  size: number
  onClick: () => void
  onRightClick: (e: React.MouseEvent) => void
}

export function Triangle({ index, color, size, onClick, onRightClick }: TriangleProps) {
  const path = generateTrianglePath(size, index);
  
  return (
    <path
      d={path}
      fill={color}
      stroke="black"
      strokeWidth="1"
      onClick={onClick}
      onContextMenu={onRightClick}
      className="cursor-pointer"
    />
  );
}

interface SplitTriangleProps {
  index: number
  leftColor: string
  rightColor: string
  size: number
  onLeftClick: () => void
  onRightClick: (e: React.MouseEvent) => void
}

export function SplitTriangle({ 
  index, 
  leftColor, 
  rightColor, 
  size, 
  onLeftClick, 
  onRightClick 
}: SplitTriangleProps) {
  const [leftPath, rightPath] = generateSplitTrianglePaths(size, index);
  
  return (
    <g>
      <path
        d={leftPath}
        fill={leftColor}
        stroke="black"
        strokeWidth="1"
        onClick={onLeftClick}
        onContextMenu={onRightClick}
        className="cursor-pointer"
      />
      <path
        d={rightPath}
        fill={rightColor}
        stroke="black"
        strokeWidth="1"
        onClick={() => onLeftClick()} // Changed to use onLeftClick but could be modified to have a separate handler
        onContextMenu={onRightClick}
        className="cursor-pointer"
      />
    </g>
  );
}