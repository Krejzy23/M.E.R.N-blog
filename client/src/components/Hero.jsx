import { useEffect, useState } from "react";

export default function Hero() {
  const [text, setText] = useState("");
  const fullText = "> initializing personal lab...";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center bg-[#0b0f19] overflow-hidden">
      
      {/* background grid */}
      <div className="absolute inset-0 opacity-10 text-transparent bg-[linear-gradient(rgba(34,211,238,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.15)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 max-w-3xl px-6 text-center font-mono text-cyan-400">
        
        <p className="text-sm mb-4 tracking-widest text-cyan-500/70">
          SYSTEM STATUS: ONLINE
        </p>

        <h1 className="text-3xl md:text-5xl font-bold text-cyan-300 mb-6">
          ALEŠ KREJZL
        </h1>

        <p className="text-base md:text-lg text-cyan-400 mb-6">
          Security Research • Hardware Hacking • Linux
        </p>

        <div className="text-left bg-black/40 border border-cyan-500/30 rounded-md p-4 mb-8">
          <span className="text-green-400">{text}</span>
          <span className="animate-pulse">▌</span>
        </div>

        <div className="flex justify-center gap-4">
          <a
            href="#posts"
            className="px-6 py-2 border border-cyan-400 text-cyan-300 hover:bg-cyan-400 hover:text-black transition"
          >
            VIEW LOGS
          </a>
          <a
            href="#contact"
            className="px-6 py-2 border border-green-400 text-green-300 hover:bg-green-400 hover:text-black transition"
          >
            OPEN CHANNEL
          </a>
        </div>
      </div>
    </div>
  );
}
