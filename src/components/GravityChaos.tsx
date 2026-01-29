"use client";

import { useEffect, useRef, useState } from "react";

export default function GravityChaos() {
  const [active, setActive] = useState(false);
  const requestRef = useRef<number>(null);
  const elementsRef = useRef<any[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, isDown: false, grabbed: null as any });

  useEffect(() => {
    const code = "gravity";
    let cursor = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === code[cursor]) {
        cursor++;
        if (cursor === code.length) {
          setActive(true);
          cursor = 0;
          // Play a sound if possible?
        }
      } else {
        cursor = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!active) return;

    const elements = document.querySelectorAll(".gravity-element");
    const physicsElements = Array.from(elements).map((el) => {
      const rect = el.getBoundingClientRect();
      // Remove framer-motion transforms to get clean values if needed, 
      // but getBoundingClientRect should be accurate for current visual state.
      
      return {
        el: el as HTMLElement,
        x: rect.left,
        y: rect.top,
        vx: (Math.random() - 0.5) * 20,
        vy: (Math.random() - 0.5) * 20,
        width: rect.width,
        height: rect.height,
        rotation: 0,
        vr: (Math.random() - 0.5) * 0.2,
        isGrabbed: false
      };
    });

    elementsRef.current = physicsElements;

    // Set initial styles to fixed to take them out of flow
    physicsElements.forEach(item => {
      item.el.style.position = 'fixed';
      item.el.style.left = '0px';
      item.el.style.top = '0px';
      item.el.style.margin = '0';
      // Important: override framer-motion or other transforms
      item.el.style.transform = `translate(${item.x}px, ${item.y}px)`;
      item.el.style.zIndex = '9999';
      item.el.style.transition = 'none';
      item.el.style.userSelect = 'none';
    });

    const gravity = 0.6;
    const friction = 0.98;
    const bounce = 0.6;
    const boundsRef = { width: window.innerWidth, height: window.innerHeight };

    const handleResize = () => {
        boundsRef.width = window.innerWidth;
        boundsRef.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const animate = () => {
      const floor = boundsRef.height;
      const walls = boundsRef.width;

      elementsRef.current.forEach(item => {
        if (item.isGrabbed) {
            // Move towards mouse with spring
            const dx = mouseRef.current.x - (item.x + item.width/2);
            const dy = mouseRef.current.y - (item.y + item.height/2);
            item.vx = dx * 0.1;
            item.vy = dy * 0.1;
            item.x += item.vx;
            item.y += item.vy;
            item.vx *= 0.5; // Dampen velocity while grabbed so it doesn't fly off instantly
            item.vy *= 0.5;
        } else {
            item.vy += gravity;
            item.x += item.vx;
            item.y += item.vy;
            item.rotation += item.vr;

            // Floor collision
            if (item.y + item.height > floor) {
            item.y = floor - item.height;
            item.vy *= -bounce;
            item.vx *= friction; 
            item.vr *= friction;
            }

            // Ceiling collision
            if (item.y < 0) {
                item.y = 0;
                item.vy *= -bounce;
            }

            // Wall collision
            if (item.x < 0) {
            item.x = 0;
            item.vx *= -bounce;
            }
            if (item.x + item.width > walls) {
            item.x = walls - item.width;
            item.vx *= -bounce;
            }
        }

        item.el.style.transform = `translate(${item.x}px, ${item.y}px) rotate(${item.rotation}rad)`;
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    const handleMouseDown = (e: MouseEvent) => {
        // Check if clicked on an element
        let grabbedItem: any = null;
        elementsRef.current.forEach(item => {
            const rect = item.el.getBoundingClientRect();
            if (e.clientX >= rect.left && e.clientX <= rect.right &&
                e.clientY >= rect.top && e.clientY <= rect.bottom) {
                grabbedItem = item;
            }
        });

        if (grabbedItem) {
            e.preventDefault(); // Prevent default interactions
            e.stopPropagation();
            mouseRef.current.isDown = true;
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
            grabbedItem.isGrabbed = true;
            mouseRef.current.grabbed = grabbedItem;
        }
    };

    const handleMouseMove = (e: MouseEvent) => {
        mouseRef.current.x = e.clientX;
        mouseRef.current.y = e.clientY;
    };

    const handleMouseUp = () => {
        mouseRef.current.isDown = false;
        if (mouseRef.current.grabbed) {
            // Throw
            mouseRef.current.grabbed.isGrabbed = false;
            // Velocity is already set by the movement in the loop, but maybe boost it?
            mouseRef.current.grabbed = null;
        }
        elementsRef.current.forEach(item => item.isGrabbed = false);
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener('resize', handleResize);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-2 font-mono z-[10000] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-pulse pointer-events-none">
      ⚠ GRAVITY FAILURE DETECTED ⚠
    </div>
  );
}