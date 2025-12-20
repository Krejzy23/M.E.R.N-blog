import AboutTerminal from "../components/AboutTerminal";
import CallToAction from "../components/CallToAction";
import Section from "../components/Section";
import { HiTerminal } from "react-icons/hi";

export default function About() {
  return (
    <Section className="pt-[5rem] mt-[2.25rem]" crosses paddings>
      <div className="max-w-5xl mx-auto -mt-10 lg:-mt-20 p-5">
        <h1 className="text-xl md:text-2xl text-cyan-300 mr-auto mb-4 flex items-center gap-2">
          <HiTerminal /> ABOUT_TERMINAL
        </h1>
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          <div className="border border-cyan-500/30 bg-black/80 p-3 text-green-400">
            <p className="text-cyan-400">&gt; lab.status</p>
            <p className="mt-1">ONLINE</p>
          </div>

          <div className="border border-cyan-500/30 bg-black/80 p-3 text-green-400">
            <p className="text-cyan-400">&gt; environment</p>
            <p className="mt-1">R&D / EXPERIMENTAL</p>
          </div>

          <div className="border border-cyan-500/30 bg-black/80 p-3 text-green-400">
            <p className="text-cyan-400">&gt; access</p>
            <p className="mt-1">AUTHORIZED</p>
          </div>
        </div>

        <AboutTerminal />
        <CallToAction />
      </div>
    </Section>
  );
}
