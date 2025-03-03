import { BLOCK_PALETTE_COLORS as COLORS } from "@/data/constants";

export async function POST(request: Request): Promise<Response> {
  const { gridSize } = await request.json();
  const pattern = Array(gridSize * gridSize)
    .fill(0)
    .map(() => {
      const type =
        Math.random() > 0.5
          ? "single"
          : ["subdivided", "diagonal", "diagonalQuadrant", "triangle"][
              Math.floor(Math.random() * 4)
            ];
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];

      if (type === "single") {
        return { type, colors: [color] };
      }

      if (["subdivided", "diagonalQuadrant", "triangle"].includes(type)) {
        return {
          type,
          colors: Array(4)
            .fill(0)
            .map(() => COLORS[Math.floor(Math.random() * COLORS.length)]),
        };
      }

      return {
        type,
        colors: Array(2)
          .fill(0)
          .map(() => COLORS[Math.floor(Math.random() * COLORS.length)]),
      };
    });
  return new Response(JSON.stringify(pattern), {
    headers: { "Content-Type": "application/json" },
  });
}
