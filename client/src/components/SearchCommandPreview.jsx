import { useLocation } from "react-router-dom";

export default function SearchCommandPreview({ total }) {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const term = params.get("searchTerm");
  const category = params.get("category");
  const sort = params.get("sort");

  return (
    <div className="mb-6 font-mono text-sm text-green-400 bg-black/80 border border-cyan-500/30 rounded-md p-4">
      <p>
        <span className="text-green-400">&gt;</span>{" "}
        <span className="text-green-400">tail --searchTerm </span>
        
        {term && <span> --term "{term}"</span>}
        {category && category !== "uncategorized" && (
          <span> --category {category}</span>
        )}
        {sort && <span> --sort {sort}</span>}
      </p>

      <p className="mt-2 text-cyan-400/70">
        &gt; found <span className="text-green-400">{total}</span> entries
        <span className="animate-pulse ml-1">▌</span>
      </p>
    </div>
  );
}
