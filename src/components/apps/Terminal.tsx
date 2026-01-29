"use client";

import { useState, useEffect, useRef } from "react";

interface TerminalProps {
  onClose: () => void;
  onMatrix: () => void;
  onOpenSnake: () => void;
  onGravity: () => void;
  onHolo: () => void;
  onSynthwave: () => void;
}

export default function Terminal({ onClose, onMatrix, onOpenSnake, onGravity, onHolo, onSynthwave }: TerminalProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([
   "PortfolioOS Terminal — session started",
"Type 'help' to see available commands.",

  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
    inputRef.current?.focus();
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const newHistory = [...history, `> ${cmd}`];

    switch (trimmedCmd) {
      case "help":
        newHistory.push(
         "Command reference:",

          "  about     - Who am I?",
          "  projects  - List projects",
          "  skills    - List skills",
          "  contact   - Contact info",
          "  clear     - Clear terminal",
          "  exit      - Close terminal",
          "  sudo      - ???",
          "  matrix    - Enter the Matrix",
          "  snake     - Play a game",
          "  gravity   - ???",
          "  holo      - 3D Mode",
          "  date      - Current date/time",
          "  hint      - Need a clue?"
        );
        break;
      case "hint":
        newHistory.push(
           "One project is intentionally restricted.",
"Access credentials are closer than they appear."

        );
        break;
      case "about":
        newHistory.push(
         "Identity: Private",
"Focus: Full-Stack Development",
"Objective: Designing thoughtful digital experiences."

        );
        break;
      case "projects":
        newHistory.push(
          "1. Portfolio (You are here)",
          "2. Financial AI Advisor",
          "3. Winter Arc App",
          "Type 'open <project_name>' to view details (Coming soon)"
        );
        break;
      case "skills":
        newHistory.push(
          "Frontend: React, Next.js, Tailwind, TypeScript,Javascript",
          "Backend: Node.js, PostgreSQL",
          "Tools: Git, Docker, AWS"
        );
        break;
      case "contact":
        newHistory.push(
          "Email: rimv5167@gmail.com",
          "Twitter: @rimjhimv303"
        );
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "exit":
        onClose();
        return;
      case "sudo":
        newHistory.push("Permission denied. Administrative access restricted."
);
        break;
      case "matrix":
        newHistory.push("System override detected… switching environments."
);
        setTimeout(() => {
            onMatrix();
        }, 1000);
        break;
      case "snake":
        newHistory.push("Starting legacy game process…")

        setTimeout(() => {
            onOpenSnake();
        }, 500);
        break;
      case "gravity":
        newHistory.push("Critical alert: Physics simulation unstable."
);
        setTimeout(() => {
            onGravity();
        }, 1000);
        break;
      case "holo":
        newHistory.push("Rendering spatial interface…"
);
        setTimeout(() => {
            onHolo();
        }, 500);
        break;
      case "date":
        newHistory.push(new Date().toString());
        break;
      case "":
        break;
      default:
        newHistory.push(`Unknown command: ${cmd}`
);
    }

    setHistory(newHistory);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input);
    }
  };

  return (
    <div 
      className="h-full bg-black text-green-500 font-mono p-4 text-sm overflow-y-auto custom-scrollbar"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="space-y-1">
        {history.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap break-words">
            {line}
          </div>
        ))}
      </div>
      <div className="flex mt-2">
        <span className="mr-2">{">"}</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-green-500 focus:ring-0 p-0"
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </div>
      <div ref={bottomRef} />
    </div>
  );
} 