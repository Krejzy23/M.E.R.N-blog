import { Link } from "react-router-dom";
import { category } from "../constants";

export default function PostCard({ post }) {
  const categoryColor =
    category.find((c) => c.title === post.category)?.color[0] || "#22d3ee";

  return (
    <Link to={`/post/${post.slug}`}>
      <div
        className="
          group relative
          w-full sm:w-[460px]
          border border-cyan-500/30
          bg-black/80 backdrop-blur
          font-mono text-sm
          p-5
          hover:border-green-400
          transition
        "
      >
        {/*SCAN LINES */}
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition">
          <div className="scan-line" />
        </div>
        {/* IMAGE AS NOISE */}
        <div className="absolute inset-0 opacity-10">
          <img src={post.image} alt="" className="w-full h-full object-cover" />
        </div>

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col gap-3">
          {/* TIMESTAMP */}
          <span className="text-cyan-500 text-xs">
            [{new Date(post.createdAt).toLocaleString()}]
          </span>

          {/* TITLE */}
          <h3 className="text-green-400 text-lg tracking-wide uppercase">
            {post.title}
          </h3>

          {/* META */}
          <div className="flex gap-4 text-xs">
            <span style={{ color: categoryColor }}>
              module: {post.category}
            </span>
            <span className="text-green-500">status: logged</span>
          </div>

          {/* ACTION */}
          <span className="text-cyan-400 group-hover:text-green-400 transition">
            &gt; open log
          </span>
        </div>
      </div>
    </Link>
  );
}
