

"use client";

import { useEffect, useRef, useState } from "react";

interface MatrixRainProps {
  onClose: () => void;
}

export default function MatrixRain({ onClose }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(false);

  // 🔑 TYPE "matrix" TO ACTIVATE
  useEffect(() => {
    const code = "matrix";
    let cursor = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === code[cursor]) {
        cursor++;
        if (cursor === code.length) {
          setActive(true);
          cursor = 0;
        }
      } else {
        cursor = 0;
      }

      // ❌ ESC to exit
      if (e.key === "Escape") {
        setActive(false);
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // 🎥 MATRIX RAIN EFFECT
  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
    const fontSize = 16;
    const columns = canvas.width / fontSize;

    const drops: number[] = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0F0";
      ctx.font = `${fontSize}px monospace`;

      drops.forEach((y, i) => {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, y * fontSize);

        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      });
    };

    const interval = setInterval(draw, 33);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black cursor-pointer"
      onClick={() => {
        setActive(false);
        onClose();
      }}
    >
      <canvas ref={canvasRef} className="block" />
      <div className="absolute top-4 right-4 text-green-500 font-mono text-xs animate-pulse">
        Type <b>ESC</b> to exit the Matrix
      </div>
    </div>
  );
}

