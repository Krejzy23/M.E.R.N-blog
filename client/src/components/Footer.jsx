import { BsGithub, BsTelephone } from "react-icons/bs";
import { FaWhatsapp, FaEnvelope, FaRegArrowAltCircleUp } from "react-icons/fa";

export default function FooterCom() {
  return (
    <footer className="relative border-t border-stroke-soft bg-black/80 text-green-400 font-mono">
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* COMMAND LINE */}
        <div className="mb-6 text-sm md:text-base text-cyan-400">
          <p>
            <span className="text-green-400">&gt;</span>
            <span className="text-green-400"> system.footer --status
            online</span> 
          </p>
          <p className="mt-1 text-cyan-400/70">
            &gt; awaiting connections
            <span className="animate-pulse ml-1">▌</span>
          </p>
        </div>

        {/* CONNECTIONS */}
        <div className="flex flex-wrap md:flex-row gap-3 items-center text-xs md:text-base">
          <span className="text-cyan-400/60">connect:</span>

          <a
            href="https://github.com/Krejzy23"
            target="_blank"
            className="flex items-center gap-2 hover:text-green-200 transition"
          >
            <BsGithub /> github
          </a>

          <a
            href="mailto:ak-webdev@seznam.cz"
            className="flex items-center gap-2 hover:text-green-200 transition"
          >
            <FaEnvelope /> mail
          </a>

          <a
            href="tel:+420777936810"
            className="flex items-center gap-2 hover:text-green-200 transition"
          >
            <BsTelephone /> phone
          </a>

          <a
            href="https://wa.me/420777936810"
            target="_blank"
            className="flex items-center gap-2 hover:text-green-200 transition"
          >
            <FaWhatsapp /> whatsapp
          </a>
          {/* Scrooll Top */}
          <div className="ml-auto">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group relative flex items-center gap-2 px-4 py-2 border border-cyan-500/40 text-cyan-400 font-mono text-sm hover:text-green-300 hover:border-green-400 transition overflow-hidden"
            >
              {/* glow */}
              <span className="absolute inset-0 bg-green-400/40 blur-lg opacity-0 group-hover:opacity-100 transition" />
              <FaRegArrowAltCircleUp className="relative z-10" />
              <span className="relative z-10">&gt; return --top</span>
            </button>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-6 border-t border-stroke-soft" />

        {/* COPYRIGHT */}
        <div className="text-xs md:text-sm text-cyan-400/60 flex justify-between flex-wrap gap-2">
          <span>© {new Date().getFullYear()} AkWebDev</span>
          <span>system.status: OK</span>
        </div>
      </div>
    </footer>
  );
}
