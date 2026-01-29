"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Folder, Mail } from "lucide-react";

interface DockProps {
  onOpenWindow: (title: string) => void;
  isSynthwave?: boolean;
}

const XIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);


export default function Dock({ onOpenWindow, isSynthwave }: DockProps) {
  const icons = [
    { icon: Folder, label: "Files", action: () => onOpenWindow("Macintosh HD") },
    { icon: XIcon, label: "X", action: () => window.open("https://x.com/rimjhimv303", "_blank") },
    
    { icon: Mail, label: "Mail", action: () => window.location.href = "mailto:rimv5167@gmail.com" },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4 md:px-0">
      <motion.div
        className={`flex items-end justify-center gap-2 md:gap-4 px-4 py-2 md:px-6 md:py-3 backdrop-blur-md border-2 rounded-2xl shadow-lg w-fit mx-auto transition-colors duration-500 gravity-element ${isSynthwave ? 'bg-black/80 border-[#00f7ff] shadow-[0_0_20px_rgba(0,247,255,0.3)]' : 'bg-white/80 border-black'}`}
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 2, type: "spring", stiffness: 200, damping: 20 }}
      >
        {icons.map((item, index) => (
          <motion.div
            key={index}
            className="relative group flex flex-col items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.2, y: -10 }}
            whileTap={{ scale: 0.9 }}
            onClick={item.action}
          >
            <div className={`p-2 md:p-3 rounded-xl border-2 shadow-sm group-hover:shadow-md transition-all ${isSynthwave ? 'bg-black border-[#ff0055] text-[#00f7ff] hover:bg-[#ff0055] hover:text-black hover:border-[#00f7ff] shadow-[0_0_10px_#ff0055]' : 'bg-white border-black hover:bg-black hover:text-white'}`}>
              <item.icon size={20} className="md:w-6 md:h-6" />
            </div>
            <span className={`absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity text-xs px-2 py-1 rounded font-mono whitespace-nowrap hidden md:block ${isSynthwave ? 'bg-[#00f7ff] text-black border border-[#ff0055]' : 'bg-black text-white'}`}>
              {item.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}