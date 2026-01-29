"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import DesktopIcon from "./DesktopIcon";
import Window from "../window/Window";
import ProfileWidget from "../widgets/ProfileWidget";
import StatusWidget from "../widgets/StatusWidget";

import BSOD from "../BSOD";
import Terminal from "../apps/Terminal";
import Snake from "../apps/Snake";
import SynthwaveBackground from "../SynthwaveBackground";
import { GuruKey, GURUS } from "@/components/TechGuru";

interface DesktopProps {
  openWindows: string[];
  toggleWindow: (title: string) => void;
  photos: string[];
  onMatrix: () => void;
  isSynthwave: boolean;
  setIsSynthwave: React.Dispatch<React.SetStateAction<boolean>>;
  onTriggerGuru: (guru: GuruKey) => void;
  onHolo: () => void;
  isHolo: boolean;
  
}

type IconType = "file" | "folder";

interface IconItem {
    label: string;
    type: IconType;
}

interface SecretFileContentProps {
  isSynthwave: boolean;
  onToggle: () => void;
  onTriggerGuru: (guru: GuruKey) => void;
}

function SecretFileContent({ isSynthwave, onToggle, onTriggerGuru }: SecretFileContentProps) {
  const [passcode, setPasscode] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const [guruCode, setGuruCode] = useState("");

  const handleDecrypt = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.toUpperCase() === "AlgoGirl") {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setPasscode("");
    }
  };

  const handleGuruCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (guruCode.toUpperCase() === "COMPILER") {
        const keys = Object.keys(GURUS) as GuruKey[];
        const randomGuru = keys[Math.floor(Math.random() * keys.length)];
        onTriggerGuru(randomGuru);
        setGuruCode("");
    }
  };

  if (unlocked) {
    return (
      <div className="space-y-6 text-green-600 font-mono h-full flex flex-col justify-center items-center text-center bg-black/5 p-4 relative">
        <h2 className="text-2xl font-bold uppercase border-b-2 border-green-600 pb-2 mb-2">ACCESS GRANTED</h2>
        
        <div className="space-y-2">
            <p className="text-lg font-bold">SECRET MODE UNLOCKED</p>
            <p className="text-sm opacity-80">You found the hidden pixel. Ready to switch dimensions?</p>
        </div>

        <button 
            onClick={onToggle}
            className={`
                relative w-16 h-8 rounded-full transition-colors duration-300 focus:outline-none border-2 border-black
                ${isSynthwave ? 'bg-[#ff00ff]' : 'bg-gray-300'}
            `}
        >
            <div 
                className={`
                    absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white border-2 border-black transition-transform duration-300 shadow-md flex items-center justify-center text-[10px]
                    ${isSynthwave ? 'translate-x-8' : 'translate-x-0'}
                `}
            >
                {isSynthwave ? '🌴' : '💾'}
            </div>
        </button>

        <p className="text-xs font-bold uppercase tracking-widest">
            {isSynthwave ? "SYNTHWAVE ACTIVE" : "RETRO MODE ACTIVE"}
        </p>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-20 animate-bounce text-xs pointer-events-none">
            ▼
        </div>

        <form onSubmit={handleGuruCode} className="absolute bottom-2 w-full px-8 opacity-10 hover:opacity-100 transition-opacity duration-500">
            <input 
                type="text" 
                value={guruCode}
                onChange={(e) => setGuruCode(e.target.value)}
                placeholder="In the name of the master..."
                className="w-full bg-transparent border-b border-green-600 text-center text-[10px] focus:outline-none font-mono uppercase"
            />
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-4 font-mono">
      <h2 className="text-xl font-bold uppercase border-b-2 border-red-600 text-red-600 pb-2">ENCRYPTED FILE</h2>
      <div className="bg-black text-green-500 p-4 text-xs overflow-hidden h-32 font-mono break-all">
        {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="opacity-50">
                01001000 01000101 01001100 01010000 00100000 01001101 01000101 
                {["A7X9B", "K2L9P", "M4N5Q", "R8S1T", "U3V6W", "X9Y2Z", "B5C8D", "E1F4G", "H7I0J", "K3L6M"][i]} 
                X8F3-99 
            </span>
        ))}
      </div>
      <form onSubmit={handleDecrypt} className="flex flex-col gap-2">
        <label className="font-bold text-sm">ENTER PASSCODE:</label>
        <div className="flex gap-2">
          <input 
            type="text" 
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            className="border-2 border-black p-2 flex-1 focus:outline-none uppercase font-mono"
            placeholder="????"
            maxLength={4}
          />
          <button type="submit" className="bg-black text-white px-4 font-bold hover:bg-gray-800 border-2 border-transparent hover:border-black transition-colors">
            DECRYPT
          </button>
        </div>
        {error && <p className="text-red-600 font-bold text-sm animate-pulse">ACCESS DENIED. INCORRECT PASSCODE.</p>}
      </form>
      <p className="text-xs text-gray-500 italic mt-4">Hint: The key lies within the contact information...</p>
    </div>
  );
}

function BinaryText() {
  const [decoded, setDecoded] = useState(false);
  
  return (
    <div 
      className="font-mono text-[10px] text-gray-400 cursor-pointer hover:text-gray-600 transition-colors select-none mt-8 pt-4 border-t border-gray-200"
      onClick={() => setDecoded(!decoded)}
    >
      {decoded ? (
        <span className="text-green-600 font-bold text-sm">ThisIsCool.</span>
      ) : (
        <div className="flex flex-col leading-tight">
            <span>01010100 01101000 01101001 01110011</span>
            <span>01101001 01110011 01100011 01101111</span>
            <span>01101111 01101100</span>
        </div>
      )}
    </div>
  );
}

export default function Desktop({ openWindows, toggleWindow, photos, onMatrix, isSynthwave, setIsSynthwave, onTriggerGuru,isHolo,  onHolo, }: DesktopProps) {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [showBSOD, setShowBSOD] = useState(false);
  const [gravityEnabled, setGravityEnabled] = useState(false);
//   const [isHolo, setIsHolo] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const clickCountRef = useRef(0);

  const handleSynthwaveToggle = () => {
    setIsTransitioning(true);
    setTimeout(() => {
        setIsSynthwave(!isSynthwave);
        setIsTransitioning(false);
    }, 2500);
  };

  useEffect(() => {
  if (!isHolo) return;

  let angle = 0;
  const interval = setInterval(() => {
    angle += 0.5;
    setRotation({
      x: Math.sin(angle * 0.05) * 10,
      y: Math.cos(angle * 0.05) * 10,
    });
  }, 16);

  return () => clearInterval(interval);
}, [isHolo]);

useEffect(() => {
  if (!isHolo) return;

  const handleKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowUp") setRotation(r => ({ ...r, x: r.x - 5 }));
    if (e.key === "ArrowDown") setRotation(r => ({ ...r, x: r.x + 5 }));
    if (e.key === "ArrowLeft") setRotation(r => ({ ...r, y: r.y - 5 }));
    if (e.key === "ArrowRight") setRotation(r => ({ ...r, y: r.y + 5 }));
  };

  window.addEventListener("keydown", handleKey);
  return () => window.removeEventListener("keydown", handleKey);
}, [isHolo]);


  useEffect(() => {
    if (!gravityEnabled) return;

    const elements = document.querySelectorAll('.gravity-element');
    const bodies: { 
        element: HTMLElement, 
        x: number, 
        y: number, 
        vx: number, 
        vy: number, 
        width: number, 
        height: number 
    }[] = [];

    elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const htmlEl = el as HTMLElement;
        
        htmlEl.style.position = 'fixed';
        htmlEl.style.left = `${rect.left}px`;
        htmlEl.style.top = `${rect.top}px`;
        htmlEl.style.width = `${rect.width}px`;
        htmlEl.style.height = `${rect.height}px`;
        htmlEl.style.margin = '0';
        htmlEl.style.zIndex = '100';
        htmlEl.style.transition = 'none';

        bodies.push({
            element: htmlEl,
            x: rect.left,
            y: rect.top,
            vx: (Math.random() - 0.5) * 10,
            vy: 0,
            width: rect.width,
            height: rect.height
        });
    });

    let animationId: number;
    const gravity = 0.5;
    const bounce = 0.7;
    const friction = 0.99;

    const update = () => {
        bodies.forEach(body => {
            body.vy += gravity;
            body.vx *= friction;
            
            body.x += body.vx;
            body.y += body.vy;

            if (body.y + body.height > window.innerHeight) {
                body.y = window.innerHeight - body.height;
                body.vy *= -bounce;
            }

            if (body.x < 0) {
                body.x = 0;
                body.vx *= -bounce;
            }
            if (body.x + body.width > window.innerWidth) {
                body.x = window.innerWidth - body.width;
                body.vx *= -bounce;
            }

            body.element.style.transform = `translate(${body.x - parseFloat(body.element.style.left)}px, ${body.y - parseFloat(body.element.style.top)}px)`;
        });

        animationId = requestAnimationFrame(update);
    };

    update();

    return () => {
        cancelAnimationFrame(animationId);
    };
  }, [gravityEnabled]);

  const handleStatusClick = () => {
    if (window.innerWidth < 768) return;

    clickCountRef.current += 1;
    if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
    }

    if (clickCountRef.current >= 5) {
        setShowBSOD(true);
        clickCountRef.current = 0;
    } else {
        clickTimeoutRef.current = setTimeout(() => {
            clickCountRef.current = 0;
        }, 500);
    }
  };

  const icons: IconItem[] = [
    { label: "About Me.txt", type: "file" },
    { label: "Education.txt", type: "file" },
    { label: "Work Experience.txt", type: "file" },
    { label: "Skills.txt", type: "file" },
    { label: "Projects", type: "folder" },
    { label: "Contact Info.txt", type: "file" },
  ];

  const projectIcons: IconItem[] = [
    { label: "Retro-Portfolio.txt", type: "file" },
    { label: "Meetsy-app.txt", type: "file" },
    { label: "ReactChess.txt", type: "file" },
    { label: "More Projects.txt", type: "file" },
    { label: "StockTradingDashboard.txt", type: "file" },
  ];

  return (
    <div
      className={`flex-1 relative p-4 overflow-y-auto md:overflow-hidden flex flex-col md:block desktop-background ${isSynthwave ? 'synthwave-mode' : ''}`}
      onClick={() => setSelectedIcon(null)}
      style={{
        perspective: isHolo || isSynthwave ? "1000px" : "none",
        transformStyle: isHolo || isSynthwave ? "preserve-3d" : "flat",
      }}
    >
      {isSynthwave && <SynthwaveBackground />}
      
      {/* {isSynthwave && <SynthwaveBackground onClose={() => setIsSynthwave(false)} />} */}


      <div 
        className="w-full h-full absolute inset-0 pointer-events-none flex flex-col md:block"
        style={{
            transform: isHolo ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` : isSynthwave ? "rotateX(15deg) translateY(-50px)" : "none",
            transformStyle: "preserve-3d",
            transition: "transform 0.5s ease-out",
        }}
      >
      <div className="relative md:absolute md:top-4 md:right-4 flex flex-row md:flex-col gap-4 items-end md:items-end z-10 pointer-events-auto w-full md:w-auto mt-auto md:mt-0 order-2 md:order-0 pb-24 md:pb-0 justify-center md:justify-start"
        style={{ transform: isHolo ? "translateZ(50px)" : "none" }}
      >
        <div className="pointer-events-auto w-auto flex justify-center md:block">
             <ProfileWidget />
        </div>
        <div 
            className="pointer-events-auto w-auto flex justify-center md:block cursor-pointer active:scale-95 transition-transform gravity-element"
            onClick={(e) => {
                e.stopPropagation();
                handleStatusClick();
            }}
        >
             <StatusWidget />
        </div>
        </div>

      {showBSOD && <BSOD onClose={() => setShowBSOD(false)} />}

      <div 
        className="grid grid-cols-3 md:grid-cols-1 gap-4 md:gap-8 w-full md:w-auto mt-4 md:mt-8 ml-4 md:ml-8 order-1 md:order-1 pointer-events-auto"
        style={{ transform: isHolo ? "translateZ(30px)" : "none" }}
      >
        {icons.map((icon) => (
          <DesktopIcon
            key={icon.label}
            label={icon.label}
            type={icon.type}
            selected={selectedIcon === icon.label}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedIcon(icon.label);
              toggleWindow(icon.label);
            }}
          />
        ))}
      </div>
      </div>


      {openWindows.map((title, index) => (
        <Window
          key={title}
          title={title}
          isOpen={true}
          onClose={() => toggleWindow(title)}
          center={title === "About Me.txt"}
          index={index}
        >
          {title === "About Me.txt" && (
            <div className="space-y-4">
                <h2 className="text-xl font-bold uppercase border-b-2 border-black pb-2">About Me</h2>
                <p>
  I am a developer focused on full-stack engineering, with a strong interest in building scalable, user-centric web applications using modern technologies.
</p>

<p>
  My work reflects hands-on experience across both frontend and backend development, where I enjoy taking ideas from concept to production through real, practical projects.
</p>

<p>
  I am continuously learning and improving by experimenting, building, and shipping applications, with an emphasis on clean architecture, performance, and usability.
</p>

<p>
  I am currently open to internship opportunities, particularly in SDE or full-stack roles, and am eager to contribute in fast-paced, impact-driven environments.
</p>

                
                <BinaryText />
            </div>
          )}
          {title === "Education.txt" && (
            <div className="space-y-4">
                <h2 className="text-xl font-bold uppercase border-b-2 border-black pb-2">Education</h2>
                <div className="border-l-2 border-black pl-4">
                    <h3 className="font-bold">Bachelor of Technology in Computer Science Engineering</h3>
                    <p className="text-sm text-gray-600">2023 - 2027</p>
                    <p className="text-xs text-gray-500 mt-1">Noida, Uttar Pradesh</p>
                    <div className="mt-2 space-y-1">
                        <p className="text-sm"><strong>CGPA:</strong> 9.00</p>
                        <p className="text-sm"><strong>Expected Graduation:</strong> Sept 2027</p>
                    </div>
                </div>
            </div>
          )}
          {title === "Work Experience.txt" && (
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold uppercase border-b-2 border-black pb-2">Work Experience</h2>
              <div className="flex flex-col gap-4">
                <div className="border-2 border-black p-3 hover:bg-black hover:text-white transition-colors cursor-default group">
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg">Full Stack Developer</h3>
                        <span className="text-xs font-mono border border-black px-1 group-hover:border-white">Dec 2024 - July 2025</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="font-mono text-sm opacity-70">ByteEdu</p>
                    </div>
                    <ul className="list-disc list-inside mt-2 text-sm space-y-1">
<li>Developed and maintained the company’s main website using React.js, Node.js, and MongoDB, improving overall performance and scalability.</li>

<li>Optimized page load time by 40% through code splitting, lazy loading, and API response optimization, resulting in a 30% increase in user traffic.</li>

<li>Built a full-featured NGO management website from scratch with responsive UI, authentication, and dynamic dashboards.</li>

<li>Designed reusable UI components and improved UX consistency, reducing user navigation time.</li>

<li>Collaborated with designers and backend teams to integrate REST APIs and ensure smooth data flow.</li>

<li>Implemented secure authentication and form validations, improving data reliability and security.</li>

<li>Fixed bugs, enhanced workflows, and improved cross-browser compatibility for better accessibility.</li>

<li>Followed Git-based version control and Agile practices for faster feature delivery.</li>
                    </ul>
                    <div className="mt-3 flex flex-wrap gap-1">
                        {["React.js", "Bootstrap", "Javascript", "Tailwind CSS","GitHub","MongoDB","Nodejs"].map(tech => (
                            <span key={tech} className="text-[10px] border border-black px-1 group-hover:border-white">{tech}</span>
                        ))}
                    </div>
                </div>

               
              </div>
            </div>
          )}
          {title === "Skills.txt" && (
            <div className="space-y-4">
                <h2 className="text-xl font-bold uppercase border-b-2 border-black pb-2">Skills</h2>
                
                <div className="space-y-4">
                    <div>
                        <h3 className="font-bold mb-2 border-b border-black w-fit">Programming Languages</h3>
                        <div className="flex flex-wrap gap-2">
                            {["C++",  "JavaScript", "TypeScript"].map(skill => (
                                <span key={skill} className="px-2 py-1 border border-black text-xs font-bold hover:bg-black hover:text-white transition-colors cursor-default">{skill}</span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold mb-2 border-b border-black w-fit">Frameworks & Libraries</h3>
                        <div className="flex flex-wrap gap-2">
                            {["React", "Next.js",  "OpenAI SDK",  "Gemini SDK", "Tailwind CSS", "Framer Motion", "shadcn/ui", "Radix UI", "Zod"].map(skill => (
                                <span key={skill} className="px-2 py-1 border border-black text-xs font-bold hover:bg-black hover:text-white transition-colors cursor-default">{skill}</span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold mb-2 border-b border-black w-fit">Databases</h3>
                        <div className="flex flex-wrap gap-2">
                            {["MongoDB", "PostgreSQL", "MySQL", "Supabase"].map(skill => (
                                <span key={skill} className="px-2 py-1 border border-black text-xs font-bold hover:bg-black hover:text-white transition-colors cursor-default">{skill}</span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold mb-2 border-b border-black w-fit">Tools & Technologies</h3>
                        <div className="flex flex-wrap gap-2">
                            {["Node.js", "Vite", "Git", "GitHub", "Prisma", "Mongoose", "Bcrypt","Drizzle"].map(skill => (
                                <span key={skill} className="px-2 py-1 border border-black text-xs font-bold hover:bg-black hover:text-white transition-colors cursor-default">{skill}</span>
                            ))}
                        </div>
                    </div>

                    <div className={`p-2 border ${isSynthwave ? 'border-[#00f7ff] bg-black/50 text-[#00f7ff] shadow-[0_0_5px_#00f7ff]' : 'border-black bg-gray-100'}`}>
                        <p className="text-sm font-mono"><strong>Current Focus:</strong> Data Structures & Algorithms (DSA)</p>
                    </div>
                </div>
            </div>
          )}
          {title === "Projects" && (
             <div className="grid grid-cols-3 gap-4">
                {projectIcons.map((icon) => (
                    <div key={icon.label} className={`flex flex-col items-center cursor-pointer p-2 rounded ${isSynthwave ? 'hover:bg-[#ff00ff]/20 text-[#00f7ff]' : 'hover:bg-gray-200'}`} onClick={() => toggleWindow(icon.label)}>
                        <div className={`w-10 h-10 border flex items-center justify-center mb-1 ${isSynthwave ? 'border-[#00f7ff] bg-black text-[#00f7ff] shadow-[0_0_5px_#00f7ff]' : 'border-black bg-white'}`}>
                            <span className="text-xs">{icon.type === 'folder' ? 'DIR' : 'FILE'}</span>
                        </div>
                        <span className="text-xs text-center">{icon.label}</span>
                    </div>
                ))}
             </div>
          )}
          {title === "Retro-Portfolio.txt" && (
            <div className="space-y-4">
                <h2 className="text-xl font-bold uppercase border-b-2 border-black pb-2">Portfolio</h2>
                <p>
  A retro-inspired portfolio website influenced by the classic Mac OS 9 era,
  crafted using Next.js, Tailwind CSS, and Framer Motion.
</p>
<p>
  It showcases a fully functional window-based interface with simulated
  drag-and-drop interactions, blending modern web performance with nostalgic
  desktop aesthetics.
</p>

                <div className="mt-4">
                    <h3 className="font-bold">Tech Stack:</h3>
                    <ul className="list-disc list-inside text-sm">
                        <li>Next.js 14 (App Router)</li>
                        <li>Tailwind CSS</li>
                        <li>Framer Motion</li>
                        <li>Lucide React Icons</li>
                    </ul>
                </div>
            </div>
          )}
          {title === "Meetsy-app.txt" && (
            <div className="space-y-4">
                <h2 className="text-xl font-bold uppercase border-b-2 border-black pb-2">Meetsy-AI-powered learning platform</h2>
               <p>
    An AI-powered community learning platform that helps learners find
    compatible study partners based on their goals, interests, and learning
    styles, enabling collaborative and goal-oriented learning.
  </p>
                <div className="space-y-2">
                    <h3 className="font-bold border-b border-black w-fit">Features</h3>
                    <ul className="list-disc list-inside text-sm space-y-1">
                        <li>
        <strong>AI-Powered Study Partner Matching:</strong> Uses semantic AI
        matching to connect learners beyond keyword-based search.
      </li>
      <li>
        <strong>Community & Goal Tracking:</strong> Create learning goals,
        track progress, and collaborate within focused learning communities.
      </li>
      <li>
        <strong>Real-Time Collaboration:</strong> Dedicated chats with study
        partners, AI-generated conversation summaries, and actionable next
        steps.
      </li>
      <li>
        <strong>Secure Authentication & Plans:</strong> Protected routes with
        FREE and PRO subscription tiers.
      </li>
      <li>
        <strong>Modern UX Experience:</strong> Responsive design, dark/light
        themes, real-time notifications, and smooth animations.
      </li>
                    </ul>
                </div>

                <div className="space-y-2">
                    <h3 className="font-bold border-b border-black w-fit">Tech Stack</h3>
                    <div className="flex flex-wrap gap-1">
                        {[
        "Next.js 16",
        "React 19",
        "TypeScript",
        "Tailwind CSS",
        "Shadcn UI",
        "PostgreSQL",
        "Drizzle ORM",
        "Clerk Auth",
        "OpenAI GPT-4o-mini",
        "Hono",
        "TanStack React Query",
        "Zod",
        "Framer Motion",
      ].map(tech => (
                            <span key={tech} className="text-[10px] border border-black px-1 bg-gray-100">{tech}</span>
                        ))}
                    </div>
                </div>
            </div>
          )}
          {title === "ReactChess.txt" && (
    <div className="space-y-4">
        <h2 className="text-xl font-bold uppercase border-b-2 border-black pb-2">ReactChess</h2>
        <p>A full-stack chess application with AI-powered opponent and real-time gameplay. Built using MongoDB, Express, React, and Node.js (MERN stack).</p>
        
        <div className="space-y-2">
            <h3 className="font-bold border-b border-black w-fit">Features</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
                <li><strong>Core Features:</strong> Real-time multiplayer gameplay, AI-powered opponent, Move validation, Player profiles, Game history & statistics.</li>
                <li><strong>UI/UX:</strong> Responsive React interface with audio effects for moves, captures, and check/checkmate alerts.</li>
                <li><strong>Game Engine:</strong> Chessboard.js & Chess.js integration for accurate game mechanics.</li>
            </ul>
        </div>

        <div className="space-y-2">
            <h3 className="font-bold border-b border-black w-fit">Tech Stack</h3>
            <div className="flex flex-wrap gap-1">
                {["React.js", "Node.js", "Express.js", "MongoDB", "Chess.js", "Chessboard.js", "JWT", "Tailwind CSS"].map(tech => (
                    <span key={tech} className="text-[10px] border border-black px-1 bg-gray-100">{tech}</span>
                ))}
            </div>
        </div>
    </div>
)}
{title === "StockTradingDashboard.txt" && (
    <div className="space-y-4">
        <h2 className="text-xl font-bold uppercase border-b-2 border-black pb-2">Stock Trading Dashboard</h2>
        <p>A full-stack stock trading dashboard inspired by Zerodha, with secure authentication, portfolio tracking, and interactive visualizations.</p>
        
        <div className="space-y-2">
            <h3 className="font-bold border-b border-black w-fit">Features</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
                <li><strong>Core Features:</strong> User authentication & authorization, RESTful APIs, Portfolio tracking, Real-time stock updates.</li>
                <li><strong>Data Visualization:</strong> Charts for stock performance & portfolio insights using Chart.js.</li>
                <li><strong>UI/UX:</strong> Modern and responsive React interface with Tailwind CSS.</li>
            </ul>
        </div>

        <div className="space-y-2">
            <h3 className="font-bold border-b border-black w-fit">Tech Stack</h3>
            <div className="flex flex-wrap gap-1">
                {["React.js", "Node.js", "Express.js", "MongoDB", "Mongoose", "JWT", "bcrypt", "Chart.js", "Tailwind CSS"].map(tech => (
                    <span key={tech} className="text-[10px] border border-black px-1 bg-gray-100">{tech}</span>
                ))}
            </div>
        </div>
    </div>
)}
      
          {title === "More Projects.txt" && (
            <div className="space-y-4">
                <h2 className="text-xl font-bold uppercase border-b-2 border-black pb-2">More Projects</h2>
                <div className={`p-4 border-2 text-center ${isSynthwave ? 'border-[#ff00ff] bg-black/50 text-[#ff00ff] shadow-[0_0_10px_#ff00ff]' : 'border-black bg-gray-100'}`}>
                    <p className="font-bold text-lg mb-2">Want to see more?</p>
                    <p>DM me on X <a href="https://x.com/rimjhimv303" className="underline font-bold">@rimjhimv303</a> to get access to my full GitHub repositories and other portfolio projects that contain all my detailed information.</p>
                </div>
            </div>
          )}
          {title === "classified.enc" && (
            <SecretFileContent isSynthwave={isSynthwave} onToggle={handleSynthwaveToggle} onTriggerGuru={onTriggerGuru} />
          )}
          {title === "Contact Info.txt" && (
            <div className="space-y-4">
                <h2 className="text-xl font-bold uppercase border-b-2 border-black pb-2">Contact Info</h2>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <span className="font-bold w-20">Email:</span>
                        <a href="mailto:rimv5167@gmail.com" className="underline hover:no-underline">rimv5167@gmail.com</a>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-bold w-20">X:</span>
                        <a href="https://x.com/rimjhimv303" className="underline hover:no-underline">@rimjhimv303</a>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-bold w-20">GitHub:</span>
                        <a href="https://x.com/rimjhimv303" className="underline hover:no-underline">DM on X for GitHub(just to mentain annonymity of myself)</a>
                    </div>
                    <div className="opacity-0 hover:opacity-100 transition-opacity text-[10px] text-gray-400 mt-8 cursor-default select-none">
                        Passcode: AlgoGirl
                    </div>
                </div>
                <div className={`mt-4 p-4 border-2 text-center ${isSynthwave ? 'border-[#ff00ff] bg-black/50 text-[#ff00ff] shadow-[0_0_10px_#ff00ff]' : 'border-black bg-gray-100'}`}>
                    <p className="font-bold">Available for internship!</p>
                </div>
            </div>
          )} 
          {title === "Macintosh HD" && (
             <div className="grid grid-cols-3 gap-4">
                {icons.map((icon) => (
                    <div key={icon.label} className="flex flex-col items-center cursor-pointer hover:bg-gray-200 p-2 rounded" onClick={() => toggleWindow(icon.label)}>
                        <div className="w-10 h-10 border border-black flex items-center justify-center bg-white mb-1">
                            <span className="text-xs">{icon.type === 'folder' ? 'DIR' : 'FILE'}</span>
                        </div>
                        <span className="text-xs text-center">{icon.label}</span>
                    </div>
                ))}
             </div>
          )}
          {title === "Leave a Message" && (
            <div className="space-y-4">
                <h2 className="text-xl font-bold uppercase border-b-2 border-black pb-2">Leave a Message</h2>
                <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); alert("Message Sent! (Simulation)"); toggleWindow("Leave a Message"); }}>
                    <div className="flex flex-col gap-1">
                        <label className="font-bold text-sm">Name:</label>
                        <input type="text" className="border-2 border-black p-2 focus:outline-none focus:bg-gray-100" placeholder="Your Name" required />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="font-bold text-sm">Message:</label>
                        <textarea className="border-2 border-black p-2 h-32 focus:outline-none focus:bg-gray-100 resize-none" placeholder="Type your message here..." required></textarea>
                    </div>
                    <button type="submit" className="bg-black text-white py-2 font-bold hover:bg-gray-800 transition-colors border-2 border-transparent hover:border-black">
                        SEND MESSAGE
                    </button>
                </form>
            </div>
          )}
          {title === "Secrets.txt" && (
            <div className="space-y-4 font-mono h-full">
                <div className="border-b-2 border-black pb-2 flex justify-between items-center">
                    <h2 className="text-xl font-bold uppercase text-red-600 tracking-widest">CLASSIFIED</h2>
                    <div className="border-2 border-red-600 text-red-600 px-2 py-1 text-xs font-bold uppercase -rotate-6 opacity-80">
                        Top Secret
                    </div>
                </div>
                <div className="bg-[#f4f1ea] p-6 font-mono text-sm h-64 overflow-y-auto border border-gray-300 shadow-inner relative">
                     <div className="space-y-4 relative z-10">
                        <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
                            <span className="font-bold text-gray-500">CODENAME:</span>
                            <span className="font-bold">AlgoGirl</span>
                            
                            <span className="font-bold text-gray-500">STATUS:</span>
                            <span className="font-bold text-green-700">ACTIVE</span>
                            
                            <span className="font-bold text-gray-500">OBJECTIVE:</span>
                            <span>CODE AND BULD</span>
                        </div>

                        <div className="border-t-2 border-dashed border-gray-300 my-2"></div>

                        <div>
                            <p className="font-bold text-gray-500 mb-1">INTERCEPTED TRANSMISSION:</p>
                            <p className="text-lg font-serif italic text-gray-800">"Stay hungry, stay foolish."</p>
                        </div>
                        
                        <div className={`mt-4 p-3 border-2 ${isSynthwave ? 'border-[#00f7ff] bg-black/80 text-[#00f7ff] shadow-[0_0_10px_#00f7ff]' : 'border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'}`}>
  <p className="font-bold">🎮 SECRET MODE ACTIVATED</p>
  <p className="text-xs mt-1">Classic move. The system remembers. 🍪</p>

  <p className="text-xs mt-2 text-gray-500 border-t border-gray-200 pt-2">
    HINT 01: The OS isn’t very stable today. Rapid clicks might push it over the edge.
  </p>
  <p className="text-xs mt-1 text-gray-500">
    HINT 02: That logo on the top bar feels… nostalgic. Try interacting with it.
  </p>
  <p className="text-xs mt-1 text-gray-500">
    HINT 03: Time is more than just numbers. Ever tried clicking it?
  </p>
  <p className="text-xs mt-1 text-gray-500">
    HINT 04: Some terminals whisper secrets. A green rain might help.
  </p>
  <p className="text-xs mt-1 text-gray-500">
    HINT 05: Old-school games still live here. Type the right word.
  </p>
  <p className="text-xs mt-1 text-gray-500">
    HINT 06: Gravity controls exist… but they were never meant for users.
  </p>
  <p className="text-xs mt-1 text-gray-500">
    HINT 07: If everything crashes, relax. The power button knows what to do.
  </p>
  <p className="text-xs mt-1 text-gray-500">
    HINT 08: Curious about what’s next? A holographic future is one command away.
  </p>
  <p className="text-xs mt-1 text-gray-500">
    HINT 09: Not all projects are visible at first glance. Look closer.
  </p>
</div>

                    </div>
                </div>
            </div>
          )}
          {title === "Photos" && (
            <div className="space-y-4">
                <div className="border-b-2 border-black pb-2 flex justify-between items-end">
                    <h2 className="text-xl font-bold uppercase">Photos</h2>
                    <span className="text-xs font-mono italic">“I enjoy capturing moments through photography.”</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {photos.map((photo) => (
                        <div 
                            key={photo} 
                            className={`aspect-square border-2 flex items-center justify-center relative overflow-hidden group cursor-pointer ${isSynthwave ? 'border-[#ff00ff] bg-black/50' : 'border-black bg-gray-200'}`}
                            onClick={() => setSelectedPhoto(photo)}
                        >
                            <Image 
                                src={`/photos/${photo}`}
                                alt={photo}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
                        </div>
                    ))}
                    {photos.length === 0 && (
                        <p className="col-span-2 text-center text-gray-500 italic">No photos found in public/photos</p>
                    )}
                </div>
            </div>
          )}
          {title === "Terminal" && (
            <Terminal 
                onClose={() => toggleWindow("Terminal")} 
                onMatrix={onMatrix} 
                onOpenSnake={() => toggleWindow("Snake")}
                onGravity={() => setGravityEnabled(true)}
                  onHolo={onHolo}  
                onSynthwave={() => setIsSynthwave(prev => !prev)}
            />
          )}
          {title === "Snake" && (
            <Snake onClose={() => toggleWindow("Snake")} />
          )}
        </Window>
      ))}

     
      {selectedPhoto && (
        <div 
            className="fixed inset-0 z-60 flex items-center justify-center bg-black/80 p-8"
            onClick={() => setSelectedPhoto(null)}
        >   <div className="relative w-full h-full max-w-4xl max-h-[90vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                 <Image 
                    src={`/photos/${selectedPhoto}`}
                    alt={selectedPhoto}
                    fill
                    className="object-contain"
                />
                <button 
                    className="absolute -top-10 left-0 text-white font-bold text-xl hover:text-gray-300"
                    onClick={() => setSelectedPhoto(null)}
                >
                    [X] CLOSE
                </button>
            </div>
        </div>
      )}
    </div>
  );
}

