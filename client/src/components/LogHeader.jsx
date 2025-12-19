export default function LogHeader({ command, result }) {
    return (
      <div className="mb-2 font-mono text-xs md:text-md lg:text-base text-green-400 bg-black/80 border border-cyan-500/30 rounded-sm p-4">
        <p>
          <span className="text-cyan-400">&gt;</span> {command}
        </p>
        {result && (
          <p className="mt-2 text-cyan-400/70">
            &gt; {result}
            <span className="animate-pulse ml-1">▌</span>
          </p>
        )}
      </div>
    );
  }