interface CellProps {
  colors: string[];
  onSubCellClick: (index: number) => void;
}

export function SubdividedCell({ colors, onSubCellClick }: CellProps) {
  return (
    <div className="subdivided-cell grid">
      {colors.map((color, index) => (
        <div
          key={index}
          className="sub-cell"
          style={{ backgroundColor: color }}
          onClick={() => onSubCellClick(index)}
        ></div>
      ))}
    </div>
  );
}

export function DiagonalSubdividedCell({ colors, onSubCellClick }: CellProps) {
  return (
    <div className="diagonal-subdivided-cell cell">
      <div
        className="diagonal-sub-cell left"
        style={{ backgroundColor: colors[0] }}
        onClick={() => onSubCellClick(0)}
      ></div>
      <div
        className="diagonal-sub-cell right"
        style={{ backgroundColor: colors[1] }}
        onClick={() => onSubCellClick(1)}
      ></div>
    </div>
  );
}

export function DiagonalQuadrantSubdividedCell({
  colors,
  onSubCellClick,
}: CellProps) {
  return (
    <div className="diagonal-quadrant-subdivided-cell cell relative">
      <div
        className="diagonal-quadrant-sub-cell cell top-left"
        style={{ backgroundColor: colors[0] }}
        onClick={() => onSubCellClick(0)}
      ></div>
      <div
        className="diagonal-quadrant-sub-cell cell top-right"
        style={{ backgroundColor: colors[1] }}
        onClick={() => onSubCellClick(1)}
      ></div>
      <div
        className="diagonal-quadrant-sub-cell cell bottom-left"
        style={{ backgroundColor: colors[2] }}
        onClick={() => onSubCellClick(2)}
      ></div>
      <div
        className="diagonal-quadrant-sub-cell cell bottom-right"
        style={{ backgroundColor: colors[3] }}
        onClick={() => onSubCellClick(3)}
      ></div>
      <div
        className="diagonal-quadrant-sub-cell cell center"
        style={{ backgroundColor: colors[4] }}
        onClick={() => onSubCellClick(4)}
      ></div>
    </div>
  );
}

export function TriangleSubdividedCell({ colors, onSubCellClick }: CellProps) {
  return (
    <div className="triangle-subdivided-cell cell">
      <div
        className="triangle-sub-cell top cell"
        style={{ backgroundColor: colors[0] }}
        onClick={() => onSubCellClick(0)}
      ></div>
      <div
        className="triangle-sub-cell right cell"
        style={{ backgroundColor: colors[1] }}
        onClick={() => onSubCellClick(1)}
      ></div>
      <div
        className="triangle-sub-cell bottom cell"
        style={{ backgroundColor: colors[2] }}
        onClick={() => onSubCellClick(2)}
      ></div>
      <div
        className="triangle-sub-cell left cell"
        style={{ backgroundColor: colors[3] }}
        onClick={() => onSubCellClick(3)}
      ></div>
    </div>
  );
}
