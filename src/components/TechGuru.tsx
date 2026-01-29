"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type GuruKey = 
  | "steve" 
  | "elon" 
  | "mark" 
  | "jensen" 
  | "linus"
  | "bill"
  | "sundar"
  | "satya"
  | "tim"
  | "reed"
  | "larrypage"
  | "sergey"
  | "jeff"
  | "kevin"
  | "sam"
  | "demis"
  | "hinton"
  | "andrew"
  | "yoshuabengio"
  | "ileya"
  | "jurgen"
  | "turing"
  | "dennis"
  | "bjarne"
  | "gvr"
  | "ken"
  | "grady"
  | "linuspauling"
  | "ada"
  | "donald"
  | "rob";

interface GuruData {
  name: string;
  quote: string;
  image: string;
}

export const GURUS: Record<GuruKey, GuruData> = {
  steve: {
    name: "Steve Jobs",
    quote: "The people who are crazy enough to think they can change the world are the ones who do.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg/800px-Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg"
  },
  elon: {
    name: "Elon Musk",
    quote: "When something is important enough, you do it even if the odds are not in your favor.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/800px-Elon_Musk_Royal_Society_%28crop2%29.jpg"
  },
  mark: {
    name: "Mark Zuckerberg",
    quote: "Move fast and break things. Unless you are breaking stuff, you are not moving fast enough.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/800px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg"
  },
  jensen: {
    name: "Jensen Huang",
    quote: "The more you buy, the more you save.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Jensen_Huang_%28cropped%29.jpg/800px-Jensen_Huang_%28cropped%29.jpg"
  },
  linus: {
    name: "Linus Torvalds",
    quote: "Most good programmers do programming not because they expect to get paid, but because it is fun.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinuxCon_Europe_Linus_Torvalds_03_%28cropped%29.jpg/800px-LinuxCon_Europe_Linus_Torvalds_03_%28cropped%29.jpg"
  },
  bill: {
  name: "Bill Gates",
  quote: "Your most unhappy customers are your greatest source of learning.",
  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Bill_Gates_2018.jpg/800px-Bill_Gates_2018.jpg"
},

sundar: {
  name: "Sundar Pichai",
  quote: "Technology is not about the devices you use. It's about the people you empower.",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgp4qIL8CFf3EnxyBSy_XtfTJtyFcTjgqFhTyYChGvvRN84E2vKKDDMYqjmYdmG-wz9imNa51bvpxLdZnsI5nfYO9kCzLYwBAqKXeLxyU&s=10"
},

satya: {
  name: "Satya Nadella",
  quote: "Our industry does not respect tradition — it respects innovation.",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5Gf-vwyqVxs69BmeKFTxjN3jk6PEBO3Z59g&s"
},

tim: {
  name: "Tim Cook",
  quote: "Let your joy be in your journey — not in some distant goal.",
  image: "https://media.cnn.com/api/v1/images/stellar/prod/210823154240-restricted-01-tim-cook-apple-career-unf.jpg?q=w_3000,c_fill"
},

reed: {
  name: "Reed Hastings",
  quote: "Do not tolerate brilliant jerks. The cost to teamwork is too high.",
  image: "https://static01.nyt.com/images/2020/09/06/fashion/06WITH-REEDHASTINGS01/06WITH-REEDHASTINGS01-mediumSquareAt3X.jpg"
},

  larrypage: {
    name: "Larry Page",
    quote: "Always work hard on something uncomfortably exciting.",
    image: "https://tii.imgix.net/production/articles/14644/9c9ef7b5-b91f-40d6-910a-b6b5e1bd7469.png?auto=compress&fit=crop&auto=format"
  },sergey: {
  name: "Sergey Brin",
  quote: "Solving big problems is easier than solving little problems.",
  image: "https://hips.hearstapps.com/hmg-prod/images/gettyimages-456023687.jpg"
},

  jeff: {
    name: "Jeff Bezos",
    quote: "If you double the number of experiments you do per year, you’re going to double your inventiveness.",
    image: "https://media.wired.com/photos/69272ed366038ec4b91c51ee/3:2/w_2560%2Cc_limit/GettyImages-2188276479.jpg"
  },kevin: {
  name: "Kevin Mitnick",
  quote: "The best security system in the world can’t protect you from the person you trust.",
  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Kevin_Mitnick_ex_hacker_y_ahora_famoso_consultor_en_redes_en_Campus_Party_M%C3%A9xico_2010.jpg/1200px-Kevin_Mitnick_ex_hacker_y_ahora_famoso_consultor_en_redes_en_Campus_Party_M%C3%A9xico_2010.jpg"
},


sam: {
  name: "Sam Altman",
  quote: "The best way to predict the future is to build it.",
  image: "https://th-i.thgim.com/public/news/national/ljd6np/article70366665.ece/alternates/FREE_1200/Sam_Altman_Artx_logo.jpg"
},

demis: {
  name: "Demis Hassabis",
  quote: "Our mission is to solve intelligence and then use that to solve everything else.",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA4WEf91QgpzAGGJ8KcBOWSaPojUaCZ34dmA&s"
},

hinton: {
  name: "Geoffrey Hinton",
  quote: "Deep learning will do things that no one can imagine today.",
  image: "https://upload.wikimedia.org/wikipedia/commons/3/30/Geoffrey_E._Hinton%2C_2024_Nobel_Prize_Laureate_in_Physics_%28cropped1%29.jpg"
},

andrew: {
  name: "Andrew Ng",
  quote: "AI is the new electricity.",
  image: "https://upload.wikimedia.org/wikipedia/commons/2/20/Andrew_Ng_at_TechCrunch_Disrupt_SF_2017.jpg"
},

yoshuabengio: {
  name: "Yoshua Bengio",
  quote: "AI should be developed for the benefit of humanity—not as a race.",
  image: "https://upload.wikimedia.org/wikipedia/commons/1/11/ICLR_2025_-_Yoshua_Bengio_02.jpg"
},

ileya: {
  name: "Ilya Sutskever",
  quote: "If you want to build a superintelligence, you need a path that scales.",
  image: "https://pbs.twimg.com/profile_images/1961115716889030656/We74zmE-_400x400.jpg"
},

jurgen: {
  name: "Jürgen Schmidhuber",
  quote: "Neural nets will reshape the future of creativity and understanding.",
  image: "https://upload.wikimedia.org/wikipedia/commons/b/b8/J%C3%BCrgen_Schmidhuber%2C_2017_%28cropped%29.jpg"
},


turing: {
  name: "Alan Turing",
  quote: "We can only see a short distance ahead, but we can see plenty there that needs to be done.",
  image: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Alan_turing_header.jpg"
},

dennis: {
  name: "Dennis Ritchie",
  quote: "UNIX is simple. It just takes a genius to understand its simplicity.",
  image: "https://computerhistory.org/wp-content/uploads/2020/01/1997_dennis_ritchie-e1580707669503.jpg"
},

bjarne: {
  name: "Bjarne Stroustrup",
  quote: "C makes it easy to shoot yourself in the foot; C++ makes it harder, but when you do it blows your whole leg off.",
  image: "https://upload.wikimedia.org/wikipedia/commons/d/da/BjarneStroustrup.jpg"
},

gvr: {
  name: "Guido van Rossum",
  quote: "The core philosophy of Python is to make code readable and simple.",
  image: "https://gvanrossum.github.io/images/guido-headshot-2019.jpg"
},

ken: {
  name: "Ken Thompson",
  quote: "One of my most productive days was throwing away 1,000 lines of code.",
  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Ken_Thompson_%28cropped%29.jpg/800px-Ken_Thompson_%28cropped%29.jpg"
},

grady: {
  name: "Grady Booch",
  quote: "A fool with a tool is still a fool.",
  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Grady_Booch.jpg/800px-Grady_Booch.jpg"
},

linuspauling: {
  name: "Linus Torvalds",
  quote: "Bad programmers worry about code. Good programmers worry about data structures and their relationships.",
  image: "https://cdn.facesofopensource.com/wp-content/uploads/2017/02/09202215/linus.faces22052.web_.jpg"
},

ada: {
  name: "Ada Lovelace",
  quote: "The Analytical Engine weaves algebraic patterns just as the loom weaves flowers.",
  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Ada_Lovelace_portrait.jpg/800px-Ada_Lovelace_portrait.jpg"
},

donald: {
  name: "Donald Knuth",
  quote: "Premature optimization is the root of all evil.",
  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Donald_Knuth_2017.jpg/800px-Donald_Knuth_2017.jpg"
},

rob: {
  name: "Rob Pike",
  quote: "Simplicity is the ultimate sophistication in software.",
  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Rob_Pike_in_2016.png/800px-Rob_Pike_in_2016.png"
}
};

interface TechGuruProps {
  activeGuru: GuruKey | null;
  onClose: () => void;
}

function AsciiOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const chars = "0101010101ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*()";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * canvas.height;
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = "rgba(255, 255, 255, 0.15)"; // White text, low opacity
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        
        // Randomly draw characters all over
        if (Math.random() > 0.9) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            ctx.fillText(text, x, y);
        }

        // Also draw the rain
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10 mix-blend-overlay" />;
}

export default function TechGuru({ activeGuru, onClose }: TechGuruProps) {
  const [typedQuote, setTypedQuote] = useState("");
  
  useEffect(() => {
    if (activeGuru) {
        setTypedQuote("");
        let i = 0;
        const quote = GURUS[activeGuru].quote;
        const interval = setInterval(() => {
            setTypedQuote(quote.slice(0, i + 1));
            i++;
            if (i === quote.length) clearInterval(interval);
        }, 50);
        return () => clearInterval(interval);
    }
  }, [activeGuru]);

  return (
    <AnimatePresence>
      {activeGuru && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] bg-black font-mono flex flex-col items-center justify-center cursor-pointer select-none overflow-hidden"
          onClick={onClose}
        >
          {/* Background Image with heavy processing */}
          <div className="absolute inset-0 z-0 opacity-20 grayscale contrast-150 scale-110 blur-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
                src={GURUS[activeGuru].image} 
                alt=""
                className="w-full h-full object-cover"
            />
          </div>

          <AsciiOverlay />
          
          {/* Scanlines */}
          <div className="absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none" />

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative z-20 w-full max-w-5xl p-8 flex flex-col md:flex-row items-center gap-8 md:gap-16"
          >
            {/* Portrait Frame */}
            <div className="relative shrink-0 group">
                <div className="absolute -inset-2 bg-white/20 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500 animate-pulse"></div>
                <div className="relative w-48 h-64 md:w-72 md:h-96 border-2 border-white/50 bg-black overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                        src={GURUS[activeGuru].image} 
                        alt={GURUS[activeGuru].name}
                        className="w-full h-full object-cover grayscale contrast-125 brightness-90 group-hover:grayscale-0 transition-all duration-700"
                    />
                    {/* Glitch overlay on image */}
                    <div className="absolute inset-0 bg-white/5 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-100" />
                    
                    {/* Corner markers */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white"></div>
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white"></div>
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white"></div>
                </div>
            </div>
            
            {/* Text Content */}
            <div className="flex-1 space-y-6 text-left">
              <div className="space-y-2">
                <motion.div 
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-4"
                >
                    <span className="px-2 py-1 bg-white text-black text-xs font-bold uppercase tracking-widest">Subject #{Math.floor(Math.random() * 9000) + 1000}</span>
                    <span className="h-px flex-1 bg-white/30"></span>
                </motion.div>

                <h2 className="text-4xl md:text-7xl font-bold uppercase tracking-tighter text-white mix-blend-difference glitch-text" data-text={GURUS[activeGuru].name}>
                  {GURUS[activeGuru].name}
                </h2>
              </div>
              
              <div className="relative pl-6 border-l-4 border-white/30">
                <p className="text-xl md:text-3xl font-bold leading-relaxed text-white/90 min-h-[100px]">
                  {typedQuote}<span className="animate-pulse">_</span>
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="pt-8 flex items-center gap-2 text-xs text-white/50 uppercase tracking-[0.2em]"
              >
                <span className="w-2 h-2 bg-white/50 rounded-full animate-ping"></span>
                System Override Active // Click to Terminate
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}