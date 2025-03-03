import { createCanvas } from "canvas";

interface ZigZagParams {
  tileScaleX: number;
  tileScaleY: number;
  width: number;
  height: number;
}

const zig = (x: number, y: number): boolean => {
  return 2 * Math.abs(y - 0.5) - x <= 0.01;
};

const zag = (x: number, y: number): boolean => {
  return 2 * Math.abs(y - 0.5) - (1 - x) <= 0.01;
};

export function GET(req: Request): Response {
  const url = new URL(req.url);
  const params = Object.fromEntries(url.searchParams.entries());

  const canvas = createCanvas(
    Number(params?.width ?? 800),
    Number(params?.height ?? 800)
  );
  const ctx = canvas.getContext("2d");

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Set up the pixel manipulation
  const imageData = ctx.createImageData(canvas.width, canvas.height);
  const data = imageData.data;

  // Tile scaling factors
  const tileScaleX = Number(params?.tileScaleX ?? 10 * 2.5);
  const tileScaleY = Number(params?.tileScaleY ?? 10);

  // Calculate UV coordinates (normalized pixel coordinates)
  const aspectRatio = canvas.height / canvas.width;

  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      // Scale UVs to create tiles
      const uvX = (x / canvas.width) * tileScaleX;
      const uvY = (y / canvas.width) * tileScaleY * aspectRatio;
      // Get tile position and fractional position within tile
      const posX = Math.floor(uvX);
      const posY = Math.floor(uvY);
      const fracX = uvX - posX;
      const fracY = uvY - posY;

      // Calculate offset for alternating pattern
      const offset = (posX + (posY % 2) * 3) % 6;

      // Determine if we should draw a triangle
      let triangle = false;
      if (offset < 3) {
        triangle = zig(fracX, fracY);
      } else {
        triangle = zag(fracX, fracY);
      }

      const r = 0.5 + 0.33 * Math.cos(-posX * 0.2 - posY + fracX);
      const g = 0.5 + 0.33 * Math.cos(-posX * 0.2 - posY + fracY + 1.3);
      const b = 0.5 + 0.33 * Math.cos(-posX * 0.2 - posY + fracX + 3.5);

      // Calculate pixel index
      const idx = (y * canvas.width + x) * 4;

      // Set pixel color
      if (triangle) {
        data[idx] = 0; // R
        data[idx + 1] = 0; // G
        data[idx + 2] = 0; // B
        data[idx + 3] = 255; // A
      } else {
        data[idx] = r * 255; // R
        data[idx + 1] = g * 255; // G
        data[idx + 2] = b * 255; // B
        data[idx + 3] = 255; // A
      }
    }
  }

  // Put the image data back on the canvas
  ctx.putImageData(imageData, 0, 0);

  return new Response(canvas.toBuffer(), {
    headers: {
      "Content-Type": "image/png",
    },
  });
}
