// Triangle path generator utility functions

export function generateTrianglePath(size: number, index: number): string {
  const center = size / 2;
  
  const trianglePaths = [
    `M 0 0 L ${center} ${center} L 0 ${center} Z`,                    // Top-left
    `M 0 0 L ${center} 0 L ${center} ${center} Z`,                    // Top-left-middle
    `M ${center} 0 L ${size} 0 L ${center} ${center} Z`,              // Top-right-middle
    `M ${size} 0 L ${size} ${center} L ${center} ${center} Z`,        // Top-right
    `M ${size} ${center} L ${size} ${size} L ${center} ${center} Z`,  // Bottom-right
    `M ${size} ${size} L ${center} ${size} L ${center} ${center} Z`,  // Bottom-right-middle
    `M ${center} ${size} L 0 ${size} L ${center} ${center} Z`,        // Bottom-left-middle
    `M 0 ${size} L 0 ${center} L ${center} ${center} Z`,              // Bottom-left
  ];
  
  return trianglePaths[index];
}

export function generateSplitTrianglePaths(size: number, index: number): [string, string] {
  const center = size / 2;
  
  // Create perpendicular splits for each triangle
  const splitPaths = [
    [
      `M 0 0 L ${center} ${center} L 0 ${center} Z`,                    // Top-left
      `M 0 0 L ${center} 0 L ${center} ${center} Z`,                    // Top-left-middle
    ],
    [
        `M 0 0 L ${center} ${center} L 0 ${center} Z`,                    // Top-left
        `M 0 0 L ${center} 0 L ${center} ${center} Z`,                    // Top-left-middle
      ],
      [
        `M 0 0 L ${center} ${center} L 0 ${center} Z`,                    // Top-left
        `M 0 0 L ${center} 0 L ${center} ${center} Z`,                    // Top-left-middle
      ],
      [
        `M 0 0 L ${center} ${center} L 0 ${center} Z`,                    // Top-left
        `M 0 0 L ${center} 0 L ${center} ${center} Z`,                    // Top-left-middle
      ],
      [
        `M 0 0 L ${center} ${center} L 0 ${center} Z`,                    // Top-left
        `M 0 0 L ${center} 0 L ${center} ${center} Z`,                    // Top-left-middle
      ],
      [
        `M 0 0 L ${center} ${center} L 0 ${center} Z`,                    // Top-left
        `M 0 0 L ${center} 0 L ${center} ${center} Z`,                    // Top-left-middle
      ],
      [
        `M 0 0 L ${center} ${center} L 0 ${center} Z`,                    // Top-left
        `M 0 0 L ${center} 0 L ${center} ${center} Z`,                    // Top-left-middle
      ],
      [
        `M 0 0 L ${center} ${center} L 0 ${center} Z`,                    // Top-left
        `M 0 0 L ${center} 0 L ${center} ${center} Z`,                    // Top-left-middle
      ],
  ];
  
  return splitPaths[index];
}