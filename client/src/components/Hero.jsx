import { useEffect, useState } from "react";

const BOOT_LINES = [
  "[ OK ] Initializing system",
  "[ OK ] Loading profile modules",
  "[ OK ] Mounting /about",
  "[ OK ] Mounting /projects",
  "[ OK ] Starting terminal service",
  "",
  "Boot sequence complete",
];

export default function Hero() {
  const [bootIndex, setBootIndex] = useState(0);
  const [bootDone, setBootDone] = useState(false);

  useEffect(() => {
    if (bootIndex < BOOT_LINES.length) {
      const t = setTimeout(() => {
        setBootIndex((prev) => prev + 1);
      }, 420);
      return () => clearTimeout(t);
    } else {
      setTimeout(() => setBootDone(true), 600);
    }
  }, [bootIndex]);

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center bg-[#0b0f19] overflow-hidden font-mono">
      {/* background grid */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(34,211,238,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.15)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="flex flex-col items-center justify-center relative z-10 max-w-3xl px-6 w-full text-center text-cyan-400">
        <p className="text-xs md:text-base mb-4 tracking-widest text-cyan-500/70">
          SYSTEM STATUS: ONLINE
        </p>

        <h1 className="text-3xl tracking-wider md:text-5xl font-bold text-cyan-300 mb-4">
          ALEŠ KREJZL
        </h1>

        <p className="text-[13px] md:text-lg text-cyan-400 mb-6">
          Security Research • Hardware Hacking • Linux
        </p>

        {/* TERMINAL – PŘESNĚ TADY */}
        <div className="text-left w-full max-w-xs md:max-w-md bg-black/80 border border-cyan-500/30 rounded-sm p-4 mb-8 transition-all text-xs md:text-sm duration-500">
          {!bootDone ? (
            <>
              {BOOT_LINES.slice(0, bootIndex).map((line, i) => (
                <div key={i} className="text-green-400">
                  {line}
                </div>
              ))}
              <span className="animate-pulse text-green-400">▌</span>
            </>
          ) : (
            <div className="text-green-400 text-center text-xs md:text-sm">
              user@AK-lab:~$ echo "Welcome back"
              <span className="animate-pulse">▌</span>
            </div>
          )}
        </div>

        {/* CTA */}
        <div
          className={`flex justify-center gap-4 transition-opacity duration-500 ${
            bootDone ? "opacity-100" : "opacity-0"
          }`}
        >
          {" "}
          <div>
            <a
              href="/search"
              className="group relative flex justify-center items-center gap-2 px-4 py-2 md:px-4 md:py-2 border border-cyan-500/40 text-cyan-400 font-mono  hover:text-green-300 hover:border-green-400 transition overflow-hidden"
            >
              {/* glow */}
              <span className="absolute inset-0 bg-green-400/40 blur-lg opacity-0 group-hover:opacity-100 transition" />
              <span className="relative z-10 text-xs md:text-sm ">&gt; view.logs</span>
            </a>
            <p className="text-[10px] text-cyan-500/60 mt-1 font-mono text-center">
              browse articles & writeups
            </p>
          </div>
          <div>
            <a
              href="/about"
              className="group relative flex justify-center items-center gap-2 px-4 py-2 md:px-6 md:py-2 border border-green-500/40 text-green-400 font-mono hover:text-cyan-300 hover:border-cyan-400 transition overflow-hidden"
            >
              {/* glow */}
              <span className="absolute inset-0 bg-cyan-400/40 blur-lg opacity-0 group-hover:opacity-100 transition" />
              <span className="relative z-10 text-xs md:text-sm ">&gt; open.channel</span>
            </a>
            <p className="text-[10px] text-cyan-500/60 mt-1 font-mono text-center">
            explore projects & experiments
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
