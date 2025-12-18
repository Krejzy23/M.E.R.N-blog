import { STATUS } from "../../constants";

export function StatusBadge({ status }) {
  const s = STATUS[status];

  return (
    <span
      className={`text-xs px-2 py-0.5 border rounded font-mono tracking-widest
        ${s.color} border-current shadow ${s.glow}`}
    >
      [{s.label}]
    </span>
  );
}
