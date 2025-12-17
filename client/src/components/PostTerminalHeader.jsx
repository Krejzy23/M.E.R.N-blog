import { Link } from "react-router-dom";

export default function PostTerminalHeader({ post }) {
  if (!post) return null;

  return (
    <div className="mt-24 mb-10 max-w-4xl mx-auto border border-cyan-500/30 bg-black/80 backdrop-blur p-6 font-mono text-green-400">
      
      {/* command: cat post.md */}
      <div className="flex items-center gap-2 text-xs mb-3">
        <span className="text-cyan-400">ak@blog:~$</span>
        <span className="text-green-400">cat post.md</span>
      </div>

      {/* output */}
      <p className="text-xs text-cyan-400 mb-2">OPENING LOG FILE</p>

      <h1 className="text-2xl md:text-3xl tracking-widest mb-4">
        {post.title}
      </h1>

      <div className="flex flex-wrap gap-3 text-xs mb-6">
        <span className="border border-cyan-500/30 px-2 py-1">
          CATEGORY: {post.category}
        </span>
        <span className="border border-cyan-500/30 px-2 py-1">
          DATE: {new Date(post.createdAt).toLocaleDateString()}
        </span>
        <span className="border border-cyan-500/30 px-2 py-1">
          READ_TIME: {(post.content.length / 1000).toFixed(0)} min
        </span>
      </div>

      {/* command: search */}
      <div className="flex items-center gap-2 text-xs">
        <span className="text-cyan-400">ak@blog:~$</span>
        <Link
          to={`/search?category=${post.category}`}
          className="
            text-green-400
            hover:text-green-300
            underline
            underline-offset-4
            transition
            hover:drop-shadow-[0_0_6px_rgba(34,197,94,0.8)]
          "
        >
          search --category {post.category}
        </Link>
        <span className="animate-pulse text-green-400">█</span>
      </div>

    </div>
  );
}
