"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface MenuBarProps {
  onOpenContact: () => void;
  onOpenMessage: () => void;
  onOpenPhotos: () => void;
  onOpenTerminal: () => void;
  toggleRetro: () => void;
  isSynthwave: boolean;
}

export default function MenuBar({
  onOpenContact,
  onOpenMessage,
  onOpenPhotos,
  onOpenTerminal,
  toggleRetro,
  isSynthwave,
}: MenuBarProps) {
  const [time, setTime] = useState("");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [appleClickCount, setAppleClickCount] = useState(0);

  // 🍎 Triple-click Apple → Retro mode
  useEffect(() => {
    if (appleClickCount === 3) {
      toggleRetro();
      setAppleClickCount(0);
    }

    const timer = setTimeout(() => setAppleClickCount(0), 1000);
    return () => clearTimeout(timer);
  }, [appleClickCount, toggleRetro]);

  // ⏰ Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleMenu = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 h-8 border-b-2 flex items-center justify-between px-2 md:px-4 z-40 font-mono text-sm select-none transition-colors duration-500 gravity-element ${
        isSynthwave
          ? "bg-black border-[#00f7ff] text-[#00f7ff] shadow-[0_0_10px_#00f7ff]"
          : "bg-white border-black text-black"
      }`}
      onClick={() => setActiveMenu(null)}
    >
      {/* LEFT */}
      <div className="flex items-center gap-3 md:gap-6 relative">
        <span
          className="text-lg cursor-pointer hover:opacity-70 active:scale-90 transition-transform select-none"
          onClick={(e) => {
            e.stopPropagation();
            setAppleClickCount((prev) => prev + 1);
          }}
        >
          
        </span>

        <span className="font-bold cursor-pointer hover:underline hidden md:block">
          File
        </span>

        {/* EDIT */}
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <span
            className={`cursor-pointer hover:underline ${
              activeMenu === "edit"
                ? isSynthwave
                  ? "bg-[#00f7ff] text-black px-1"
                  : "bg-black text-white px-1"
                : ""
            }`}
            onClick={() => toggleMenu("edit")}
          >
            Edit
          </span>

          {activeMenu === "edit" && (
            <div
              className={`absolute top-full left-0 mt-1 w-48 border-2 py-1 z-50 ${
                isSynthwave
                  ? "bg-black border-[#ff0055] shadow-[0_0_10px_#ff0055] text-[#ff0055]"
                  : "bg-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              }`}
            >
              <div
                className={`px-4 py-2 cursor-pointer ${
                  isSynthwave
                    ? "hover:bg-[#ff0055] hover:text-black"
                    : "hover:bg-black hover:text-white"
                }`}
                onClick={() => {
                  onOpenMessage();
                  setActiveMenu(null);
                }}
              >
                Leave a Message
              </div>
            </div>
          )}
        </div>

        {/* VIEW */}
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <span
            className={`cursor-pointer hover:underline ${
              activeMenu === "view"
                ? isSynthwave
                  ? "bg-[#00f7ff] text-black px-1"
                  : "bg-black text-white px-1"
                : ""
            }`}
            onClick={() => toggleMenu("view")}
          >
            View
          </span>

          {activeMenu === "view" && (
            <div
              className={`absolute top-full left-0 mt-1 w-48 border-2 py-1 z-50 ${
                isSynthwave
                  ? "bg-black border-[#ff0055] shadow-[0_0_10px_#ff0055] text-[#ff0055]"
                  : "bg-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              }`}
            >
              <div
                className={`px-4 py-2 cursor-pointer ${
                  isSynthwave
                    ? "hover:bg-[#ff0055] hover:text-black"
                    : "hover:bg-black hover:text-white"
                }`}
                onClick={() => {
                  onOpenPhotos();
                  setActiveMenu(null);
                }}
              >
                Photos
              </div>
            </div>
          )}
        </div>

        <span className="cursor-pointer hover:underline" onClick={onOpenContact}>
          Help
        </span>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2 md:gap-4">
        <button
          className={`px-2 md:px-3 py-0.5 transition-colors uppercase text-[10px] md:text-xs font-bold tracking-wider whitespace-nowrap ${
            isSynthwave
              ? "bg-[#ff0055] text-black hover:bg-[#ff0055]/80 shadow-[0_0_10px_#ff0055]"
              : "bg-black text-white hover:bg-gray-800"
          }`}
          onClick={onOpenContact}
        >
          Hire Me
        </button>

        <span
          className={`hidden md:block cursor-pointer select-none px-1 transition-colors ${
            isSynthwave
              ? "hover:bg-[#00f7ff] hover:text-black"
              : "hover:bg-black hover:text-white"
          }`}
          onDoubleClick={onOpenTerminal}
          title="Double click for Terminal"
        >
          {time}
        </span>
      </div>
    </div>
  );
}
