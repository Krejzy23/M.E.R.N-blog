import { Link } from "react-router-dom";

export default function CallToAction() {
  return (
    <div className="max-w-4xl mx-auto mt-16 border border-cyan-500/30 bg-black/80 p-6 font-mono text-green-400">
      <p className="text-cyan-400 text-xs mb-2">
        ak@blog:~$ cat /author/info
      </p>

      <div className="space-y-1 text-sm">
        <p>AUTHOR: <span className="text-green-300">ales krejzl</span></p>
        <p>ROLE: <span className="text-green-300">Full-Stack Developer</span></p>
        <p>
          STATUS:{" "}
          <span className="text-green-400 animate-pulse">
            AVAILABLE_FOR_COOPERATION
          </span>
        </p>
      </div>

      <div className="mt-4 flex gap-4 text-xs">
        <a
          href="https://mac-os-port-three.vercel.app/"
          className="border border-cyan-500/30 px-3 py-1 text-cyan-400 hover:bg-cyan-500/10 transition"
          target="_blank"
        >
          open portfolio
        </a>

        <a
          href="mailto:ales.krejzl@gmail.com"
          className="border border-green-500/30 px-3 py-1 text-green-400 hover:bg-green-500/10 transition"
        >
          contact
        </a>
      </div>
    </div>
  );
}
