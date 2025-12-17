import React from "react";
import Section from "../components/Section";
import { BottomLine } from "../components/design/Hero";
import Tagline from "../components/Tagline";
import Promo from "../components/Promo";
import AnimatedPhoenix from "../svg/AnimatedPhoenix";

export default function About() {
  return (
    <div>
      <Section className="pt-[5rem] mt-[2.25rem]" crosses paddings>
        <div className="relative max-w-[77.5rem] mx-auto px-5 md:px-10 lg:px-15 xl:max-w-[87.5rem]">
          <AnimatedPhoenix />
          <Tagline className="text-xl">#ABOUT ME</Tagline>
          <div className="flex justify-center items-center">
            <Section crosses customPaddings showVerticalLines={true}>
              <Promo />
            </Section>
          </div>
          <div className="relative z-1 max-w-[62rem] mx-auto text-center">
            <h1 className="text-transparent text-stroker-1 text-stroke-custom mt-10 font-semibold text-4xl lg:text-6xl tracking-wider font-poppins">
              About Me
            </h1>
            <p className="font-semibold px-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laboriosam doloribus debitis odit vero at eligendi dolorum dolor
              cupiditate aliquam, accusantium eveniet?
            </p>
          </div>
        </div>
        <BottomLine crosses paddings customPaddings />
      </Section>
      <Section crosses></Section>
    </div>
  );
}
