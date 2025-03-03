import { SubdivisionType } from "../store/quilt/block";

export function generateSVG(
  pattern: Array<{
    type: SubdivisionType;
    colors: string[];
  }>,
  gridSize: number
): string {
  const cellSize = 50;
  const svgSize = gridSize * cellSize;
  let svgContent = `<svg width="${svgSize}" height="${svgSize}" xmlns="http://www.w3.org/2000/svg">`;

  pattern.forEach((cell, index) => {
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;
    const x = col * cellSize;
    const y = row * cellSize;

    if (cell.type === "single") {
      svgContent += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="${cell.colors[0]}" />`;
    } else if (cell.type === "subdivided") {
      svgContent += `
        <rect x="${x}" y="${y}" width="${cellSize / 2}" height="${cellSize / 2}" fill="${cell.colors[0]}" />
        <rect x="${x + cellSize / 2}" y="${y}" width="${cellSize / 2}" height="${cellSize / 2}" fill="${cell.colors[1]}" />
        <rect x="${x}" y="${y + cellSize / 2}" width="${cellSize / 2}" height="${cellSize / 2}" fill="${cell.colors[2]}" />
        <rect x="${x + cellSize / 2}" y="${y + cellSize / 2}" width="${cellSize / 2}" height="${cellSize / 2}" fill="${cell.colors[3]}" />
      `;
    } else if (cell.type === "diagonal") {
      svgContent += `
        <polygon points="${x},${y} ${x + cellSize},${y} ${x},${y + cellSize}" fill="${cell.colors[0]}" />
        <polygon points="${x + cellSize},${y} ${x + cellSize},${y + cellSize} ${x},${y + cellSize}" fill="${cell.colors[1]}" />
      `;
    } else if (cell.type === "diagonalQuadrant") {
      svgContent += `
        <polygon points="${x},${y} ${x + cellSize / 2},${y} ${x},${y + cellSize / 2}" fill="${cell.colors[0]}" />
        <polygon points="${x + cellSize / 2},${y} ${x + cellSize},${y} ${x + cellSize},${y + cellSize / 2}" fill="${cell.colors[1]}" />
        <polygon points="${x},${y + cellSize / 2} ${x + cellSize / 2},${y + cellSize} ${x},${y + cellSize}" fill="${cell.colors[2]}" />
        <polygon points="${x + cellSize},${y + cellSize / 2} ${x + cellSize},${y + cellSize} ${x + cellSize / 2},${y + cellSize}" fill="${cell.colors[3]}" />
      `;
    } else if (cell.type === "triangle") {
      svgContent += `
        <polygon points="${x},${y} ${x + cellSize},${y} ${x + cellSize / 2},${y + cellSize / 2}" fill="${cell.colors[0]}" />
        <polygon points="${x + cellSize},${y} ${x + cellSize},${y + cellSize} ${x + cellSize / 2},${y + cellSize / 2}" fill="${cell.colors[1]}" />
        <polygon points="${x},${y + cellSize} ${x + cellSize},${y + cellSize} ${x + cellSize / 2},${y + cellSize / 2}" fill="${cell.colors[2]}" />
        <polygon points="${x},${y} ${x},${y + cellSize} ${x + cellSize / 2},${y + cellSize / 2}" fill="${cell.colors[3]}" />
      `;
    }
  });

  svgContent += "</svg>";
  return svgContent;
}
