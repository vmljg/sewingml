"use client";

import { useEffect, useRef, useCallback } from "react";

// Debounce function
const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export default function ZigzagShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const { width, height } = container.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;
  }, []);

  const debouncedResizeCanvas = useCallback(debounce(resizeCanvas, 250), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Initial resize
    resizeCanvas();

    // Set up ResizeObserver to watch for container size changes
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries.length) return;
      debouncedResizeCanvas();
    });

    resizeObserver.observe(container);

    // Animation variables
    let animationId: number;
    const startTime = Date.now();

    const zig = (x: number, y: number): boolean => {
      return 2 * Math.abs(y - 0.5) - x <= 0.01;
    };

    const zag = (x: number, y: number): boolean => {
      return 2 * Math.abs(y - 0.5) - (1 - x) <= 0.01;
    };

    const draw = () => {
      if (!ctx || !canvas) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate time in seconds
      const iTime = (Date.now() - startTime) / 1000;

      // Set up the pixel manipulation
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      // Tile scaling factors
      const tileScaleX = 2 * 2.5;
      const tileScaleY = 2;

      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          // Calculate UV coordinates (normalized pixel coordinates)
          const aspectRatio = canvas.height / canvas.width;

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

          // Calculate color based on time and position
          const r =
            0.5 + 0.35 * Math.cos(iTime * 0.5 - posX * 0.2 - posY + fracX);
          const g =
            0.5 +
            0.35 * Math.cos(iTime * 0.5 - posX * 0.2 - posY + fracY + 1.3);
          const b =
            0.5 +
            0.35 * Math.cos(iTime * 0.5 - posX * 0.2 - posY + fracX + 3.5);

          // Calculate pixel index
          const idx = (y * canvas.width + x) * 4;

          // Set pixel color
          if (triangle) {
            data[idx] = 255; // R
            data[idx + 1] = 255; // G
            data[idx + 2] = 255; // B
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

      // Continue animation loop
      animationId = requestAnimationFrame(draw);
    };

    // Start animation
    animationId = requestAnimationFrame(draw);

    // Error handling for ResizeObserver
    const errorHandler = (e: ErrorEvent) => {
      if (
        e.message ===
        "ResizeObserver loop completed with undelivered notifications."
      ) {
        e.preventDefault();
      }
    };

    window.addEventListener("error", errorHandler);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      window.removeEventListener("error", errorHandler);
    };
  }, [resizeCanvas, debouncedResizeCanvas]);

  return (
    <div ref={containerRef} className="relative h-[100cqb] w-full">
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        aria-label="Zigzag shader animation"
      />
    </div>
  );
}
