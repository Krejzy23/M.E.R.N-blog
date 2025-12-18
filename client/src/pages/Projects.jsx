import React from "react";
import Section from "../components/Section";
import { BottomLine } from "../components/design/Hero";

const Projects = () => {
  return (
    <Section className="pt-[5rem] mt-[2.25rem]" crosses paddings>
      <div className="flex items-center justify-center">
        <h1 className="text-xl font-mono text-green-400">Coming soon....</h1>
      </div>
      <BottomLine crosses paddings customPaddings />
    </Section>
  );
};

export default Projects;
