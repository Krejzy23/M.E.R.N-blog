import AboutTerminal from "../components/AboutTerminal";
import CallToAction from "../components/CallToAction";
import Section from "../components/Section";

export default function About() {
  return (
    <Section className="pt-[5rem] mt-[2.25rem]" crosses paddings>
      <div className="max-w-5xl mx-auto">
        <AboutTerminal />
        <CallToAction />
      </div>
    </Section>
  );
}
