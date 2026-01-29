// "use client";

// import React from 'react';
// import { motion } from 'framer-motion';





// export default function SynthwaveBackground() {
//   return (
//     <div className="fixed inset-0 z-0 overflow-hidden bg-[#050011] pointer-events-none">
//       {/* Stars */}
//       <div className="absolute inset-0 opacity-70">
//         {[...Array(70)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute bg-white rounded-full"
//             initial={{
//               x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
//               y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
//               scale: Math.random() * 0.8 + 0.2,
//               opacity: Math.random(),
//             }}
//             animate={{
//               opacity: [0.2, 1, 0.2],
//               scale: [1, 1.5, 1],
//             }}
//             transition={{
//               duration: Math.random() * 3 + 2,
//               repeat: Infinity,
//               ease: "easeInOut",
//             }}
//             style={{
//               width: Math.random() * 2 + 1 + 'px',
//               height: Math.random() * 2 + 1 + 'px',
//             }}
//           />
//         ))}
//       </div>

//       {/* Retro Sun */}
//       <motion.div 
//         className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full z-0"
//         animate={{
//             boxShadow: [
//                 "0 0 100px rgba(255,0,85,0.6)",
//                 "0 0 150px rgba(255,0,85,0.8)",
//                 "0 0 100px rgba(255,0,85,0.6)"
//             ]
//         }}
//         transition={{
//             duration: 4,
//             repeat: Infinity,
//             ease: "easeInOut"
//         }}
//       >
//          <div className="w-full h-full rounded-full bg-gradient-to-b from-[#ffd700] via-[#ff0055] to-[#9900ff] relative overflow-hidden">
//             {/* Sun Stripes (Masking) */}
//             <motion.div 
//                 className="absolute inset-0"
//                 initial={{ backgroundPosition: "0 0" }}
//                 animate={{ backgroundPosition: "0 -60px" }}
//                 transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
//                 style={{
//                     background: `repeating-linear-gradient(
//                         to bottom,
//                         transparent 0px,
//                         transparent 40px,
//                         #050011 40px,
//                         #050011 45px
//                     )`,
//                     backgroundSize: "100% 60px",
//                     maskImage: "linear-gradient(to bottom, transparent 20%, black 60%)",
//                     WebkitMaskImage: "linear-gradient(to bottom, transparent 20%, black 60%)"
//                 }}
//             />
//          </div>
//       </motion.div>



//       {/* Moving Grid (Terrain) */}
//       <div 
//         className="absolute bottom-0 left-0 right-0 h-[50vh] origin-bottom z-10"
//         style={{
//             perspective: '500px',
//             transformStyle: 'preserve-3d',
//         }}
//       >
//         <div 
//             className="absolute inset-0 w-[200%] -left-[50%] h-[200%]"
//             style={{
//                 background: `
//                     linear-gradient(transparent 0%, #ff0055 2%, transparent 3%),
//                     linear-gradient(90deg, transparent 0%, #00f7ff 2%, transparent 3%)
//                 `,
//                 backgroundSize: '60px 60px',
//                 transform: 'rotateX(60deg)',
//                 transformOrigin: 'bottom center',
//                 animation: 'gridMove 1s linear infinite',
//                 boxShadow: '0 0 100px #ff0055',
//                 maskImage: 'linear-gradient(to bottom, transparent, black 20%)'
//             }}
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-[#0b0014] via-transparent to-transparent" />
//       </div>



//       <style jsx>{`
//         @keyframes gridMove {
//           0% {
//             background-position: 0 0;
//           }
//           100% {
//             background-position: 0 60px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

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

