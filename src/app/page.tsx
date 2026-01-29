// "use client";

// import { useState } from "react";
// import Window from "../components/Window";

// export default function Home() {
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       {/* Top bar */}
//     <div className="topbar">
//   <span>File</span>
//   <span>Edit</span>

//   <div className="menu">
//     <span>View</span>
//     <div className="dropdown">Photos</div>
//   </div>

//   <span>Help</span>
//   <button className="hire">HIRE ME</button>
// </div>


//       <main className="layout">
//         {/* Left files */}
//         <div className="files">
//           {[
//             "About Me.txt",
//             "Education.txt",
//             "Work Experience.txt",
//             "Skills.txt",
//             "Projects",
//             "Contact Info.txt",
//           ].map((f) => (
//             <div key={f} className="file" onClick={() => setOpen(true)}>
//               📄 {f}
//             </div>
//           ))}
//         </div>

//         {/* Center image */}
//         <div className="center">
//           <img src="/center.jpg" />
//         </div>

//         {/* Right profile */}
//         <div className="right">
//           <div className="profile box">
//             <img src="/avatar.png" />
//             <h2>PunkCompiler</h2>
//             <p>Broke, confused, but too stubborn to quit</p>
//           </div>

//           <div className="status box">
//             <strong>OPEN FOR WORK</strong>
//             <p>Last updated: Today</p>
//           </div>
//         </div>

//        {open && (
//   <Window title="AboutMe.txt" onClose={() => setOpen(false)}>
//     <pre className="window-content">
// {`ABOUT ME
// --------

// Hi, I’m a Full-Stack Developer.

// I enjoy working across the entire product lifecycle—from turning ideas 
// into functional products to designing intuitive user interfaces and building scalable backend systems. My primary tech stack includes React, Next.js, and Node.js, and I’m comfortable working on both frontend and backend to deliver complete, end-to-end solutions.

// I follow a simple mindset: learn, build, and ship. I believe the best way to grow as a developer is through hands-on experimentation, so I’m constantly working on projects, exploring new technologies, and improving my skills by building real applications rather than relying only on theory.


// Currently, I’m open to internship opportunities as well as SDE and full-stack roles. I’m especially interested in fast-moving, impact-driven startup environments where ownership, learning, and shipping meaningful products are valued. I’m always experimenting and looking for opportunities where I can grow while contributing to real-world products.

// Status: Always experimenting ⚡`}
//     </pre>
//   </Window>
// )}

//       </main>

//       {/* Bottom dock */}
//       <div className="dock">
//         <span>📁</span>
//         <span>✖</span>
//         <span>🎧</span>
//         <span>✉️</span>
//       </div>
//     </>
//   );
// }


// "use client";

// import { useState } from "react";
// import Window from "@/components/Window";

// export default function Home() {
//   const [open, setOpen] = useState<string | null>(null);

//   return (
//     <main className="desktop">
//       {/* LEFT ICONS */}
//       <div className="icons">
//         <div onClick={() => setOpen("about")} className="icon">📄 About Me.txt</div>
//         <div onClick={() => setOpen("skills")} className="icon">📄 Skills.txt</div>
//         <div onClick={() => setOpen("projects")} className="icon">📁 Projects</div>
//       </div>

//       {/* WINDOWS */}
//       {open === "about" && (
//         <Window title="ABOUT ME.TXT" onClose={() => setOpen(null)}>
//           <p>
//             I am a full-stack developer focused on modern web technologies and
//             Generative AI. I enjoy building real-world projects.
//           </p>
//         </Window>
//       )}

//       {open === "skills" && (
//         <Window title="SKILLS.TXT" onClose={() => setOpen(null)}>
//           <h4>Programming Languages</h4>
//           <div className="tags">
//             <span>C++</span><span>Python</span><span>JavaScript</span><span>TypeScript</span>
//           </div>

//           <h4>Frameworks</h4>
//           <div className="tags">
//             <span>React</span><span>Next.js</span><span>Tailwind</span>
//             <span>Framer Motion</span><span>shadcn/ui</span>
//           </div>

//           <h4>Databases</h4>
//           <div className="tags">
//             <span>MongoDB</span><span>PostgreSQL</span><span>MySQL</span>
//           </div>
//         </Window>
//       )}
//     </main>
//   );
// }

import fs from "fs";
import path from "path";
import ClientHome from "@/components/ClientHome";

export default function Home() {
  const photosDir = path.join(process.cwd(), "public/photos");
  let photos: string[] = [];

  try {
    if (fs.existsSync(photosDir)) {
      photos = fs.readdirSync(photosDir).filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
      });
    }
  } catch (error) {
    console.error("Error reading photos directory:", error);
  }

  return <ClientHome photos={photos} />;
}