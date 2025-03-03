import { generateSVG } from "@/lib/quilt/block";
export async function POST(request: Request): Promise<Response> {
  const { pattern, gridSize } = await request.json();
  if (!Array.isArray(pattern) || typeof gridSize !== "number") {
    return new Response("Invalid input data", { status: 400 });
  }
  const svgContent = generateSVG(pattern, gridSize);
  return new Response(svgContent, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Content-Disposition": "attachment; filename=quilt_pattern.svg",
    },
  });
}
