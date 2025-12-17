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
        {/* SCAN LINES */}
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition">
          <div className="scan-line" />
        </div>

        {/* IMAGE AS NOISE */}
        <div className="absolute inset-0 opacity-10">
          <img src={post.image} alt="" className="w-full h-full object-cover" />
        </div>

        <div className="relative z-10 flex flex-col gap-3">
          {/* TYPE / MODULE */}
          <div className="flex flex-col md:flex-row justify-between">
            <div
              className="inline-flex w-fit items-center gap-2 border px-2 py-[2px] text-xs"
              style={{
                borderColor: categoryColor,
                color: categoryColor,
              }}
            >
              <span className="opacity-70">module:</span>
              <span className="uppercase tracking-wide">{post.category}</span>
            </div>
            {/* TIMESTAMP */}
            <span className="text-cyan-500 mt-2 text-xs">
              [{new Date(post.createdAt).toLocaleString()}]
            </span>
          </div>

          {/* TITLE */}
          <h3 className="text-green-400 text-lg tracking-wide uppercase">
            {post.title}
          </h3>

          {/* STATUS */}
          <div className="flex gap-4 text-xs text-green-500">
            <span>status: logged</span>
            <span>integrity: ok</span>
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
