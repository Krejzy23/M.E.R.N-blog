import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function TerminalDropdown({
  value,
  options,
  onChange,
  placeholder = "select",
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const current = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative font-mono text-sm">
      {/* HEADER */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="
          w-full flex items-center justify-between
          px-3 py-2
          bg-black/80
          border border-cyan-500/40
          text-green-400
          hover:border-green-400
          transition
        "
      >
        <span>
          {current ? current.label : placeholder}
        </span>
        <FaChevronDown
          className={`transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* DROPDOWN */}
      {open && (
        <div
          className="
            absolute z-50 mt-1 w-full
            bg-black/95 backdrop-blur
            border border-cyan-500/30
            max-h-60 overflow-auto
          "
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`
                w-full text-left px-3 py-2
                transition
                ${
                  value === opt.value
                    ? "text-green-400 bg-cyan-500/10"
                    : "text-cyan-400 hover:text-green-400 hover:bg-cyan-500/10"
                }
              `}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}