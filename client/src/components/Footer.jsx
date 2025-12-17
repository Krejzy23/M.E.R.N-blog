import { BsGithub, BsTelephone } from "react-icons/bs";
import { FaWhatsapp, FaEnvelope} from "react-icons/fa";
import { BsFileArrowUp } from "react-icons/bs";

export default function FooterCom() {
  return (
    <footer className="relative border-t border-cyan-500/30 bg-black/90 text-green-400 font-mono">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* COMMAND LINE */}
        <div className="mb-6 text-sm text-cyan-400">
          <p>
            <span className="text-green-400">&gt;</span> system.footer --status
            online
          </p>
          <p className="mt-1 text-cyan-400/70">
            &gt; awaiting connections
            <span className="animate-pulse ml-1">▌</span>
          </p>
        </div>

        {/* CONNECTIONS */}
        <div className="flex flex-wrap gap-6 items-center text-sm">
          <span className="text-cyan-400/60">connections:</span>

          <a
            href="https://github.com/Krejzy23"
            target="_blank"
            className="flex items-center gap-2 hover:text-green-300 transition"
          >
            <BsGithub /> github
          </a>

          <a
            href="mailto:ak-webdev@seznam.cz"
            className="flex items-center gap-2 hover:text-green-300 transition"
          >
            <FaEnvelope /> mail
          </a>

          <a
            href="tel:+420777936810"
            className="flex items-center gap-2 hover:text-green-300 transition"
          >
            <BsTelephone /> phone
          </a>

          <a
            href="https://wa.me/420777936810"
            target="_blank"
            className="flex items-center gap-2 hover:text-green-300 transition"
          >
            <FaWhatsapp /> whatsapp
          </a>
        </div>

        {/* DIVIDER */}
        <div className="my-6 border-t border-cyan-500/20" />

        <div className="flex justify-end mb-6">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="
      group
      relative
      flex items-center gap-2
      px-4 py-2
      border border-cyan-500/40
      text-cyan-400
      font-mono text-sm
      hover:text-green-300
      hover:border-green-400
      transition
      overflow-hidden
    "
          >
            {/* glow */}
            <span className="absolute inset-0 bg-green-400/10 blur-lg opacity-0 group-hover:opacity-100 transition" />

            <BsFileArrowUp className="relative z-10" />
            <span className="relative z-10">&gt; return --top</span>
          </button>
        </div>

        {/* COPYRIGHT */}
        <div className="text-xs text-cyan-400/60 flex justify-between flex-wrap gap-2">
          <span>© {new Date().getFullYear()} AkWebDev</span>
          <span>system.status: OK</span>
        </div>
      </div>
    </footer>
  );
}
