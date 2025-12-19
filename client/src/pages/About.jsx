import AboutTerminal from "../components/AboutTerminal";
import CallToAction from "../components/CallToAction";
import Section from "../components/Section";
import { HiTerminal } from "react-icons/hi";

export default function About() {
  return (
    <Section className="pt-[5rem] mt-[2.25rem]" crosses paddings>
      <div className="max-w-5xl mx-auto -mt-10 lg:-mt-20 p-5">
        <h1 className="text-xl md:text-2xl text-cyan-300 mb-4 flex items-center gap-2">
          <HiTerminal /> ABOUT_TERMINAL
        </h1>
        <AboutTerminal />
        <CallToAction />
      </div>
    </Section>
  );
}
