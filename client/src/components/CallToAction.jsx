
export default function CallToAction() {
  return (
    <div className="max-w-md mx-auto mt-16 border border-cyan-500/30 bg-black/80 p-6 font-mono text-green-400">
      <div className="flex flex-col items-center justify-center">
        <p className="mr-20 text-cyan-400 text-xs mb-2">
          ak@blog:~$ cat /author/info
        </p>

        <div className="space-y-1 text-sm">
          <p>
            AUTHOR: <span className="text-green-300">ales krejzl</span>
          </p>
          <p>
            ROLE: <span className="text-green-300">Full-Stack Developer</span>
          </p>
          <p>
            STATUS:{" "}
            <span className="text-green-400 animate-pulse">
              AVAILABLE_FOR_COOPERATION
            </span>
          </p>
        </div>

        <div className="flex space-x-10 mt-4 gap-4 text-xs">
          <a
            href="https://mac-os-port-three.vercel.app/"
            className="border border-cyan-400/30 px-3 py-2 text-cyan-400 hover:bg-cyan-400/20 transition"
            target="_blank"
          >
            open portfolio
          </a>

          <a
            href="mailto:ales.krejzl@gmail.com"
            className="border border-green-400/30 px-3 py-2 text-green-400 hover:bg-green-400/20 transition"
            target="_blank"
          >
            contact
          </a>
        </div>
      </div>
    </div>
  );
}
