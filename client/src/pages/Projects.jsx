import React from "react";
import Section from "../components/Section";
import { projects } from "../constants";
import { bgProjects } from "../assets";
import Tagline from "../components/Tagline";

const Projects = () => {
  return (
    <Section
      crosses
      className="pt-[2rem] mt-[1.25rem]"
      customPaddings
    >
      <div className="relative max-w-[77.5rem] md:px-10 lg:px-16 xl:max-w-[87.5rem] flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
        <div className="py-20 max-w-7xl w-full">
        <Tagline className="text-xl">#MY PROJECTS</Tagline>
          <h1 className="h1 body-1 font-poppins mt-20 ml-20">
            A small selection of my{" "}
            <h1 className="flex h1 justify-center items-center font-semibold text-stroke-1 font-poppins text-transparent text-stroker-1 text-stroke-custom">Recent projects</h1>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 p-4 gap-16 mt-10">
            {projects.map((item) => (
              <div
                key={item.id}
                className="flex relative lg:min-h-[32.5rem] h-[28rem] items-center justify-center"
              >
                <div className="border border-stroke-1 rounded-2xl flex flex-col w-full h-full overflow-hidden p-5">
                  <div className="relative flex items-center justify-center w-full overflow-hidden sm:h-[40vh] h-[35vh] lg:h-[30vh] mb-10">
                    <div
                      className="relative w-full h-full justify-center items-center overflow-hidden rounded-3xl"
                      style={{ backgroundColor: "#13162D" }}
                    >
                      <img src={bgProjects} alt="bgImg" />
                    </div>
                    <img
                      src={item.img}
                      alt="cover"
                      className="absolute bottom-0 z-10"
                    />
                  </div>
                  <h1 className="h1 body-1 text-base font-bold line-clamp-1">
                    {item.title}
                  </h1>
                  <p
                    className="text-sm lg:text-xl font-light line-clamp-2 lg:font-normal"
                    style={{
                      color: "#BEC1DD",
                      margin: "1vh 0",
                    }}
                  >
                    {item.text}
                  </p>

                  <div className="flex items-center justify-between mt-7 mb-3">
                    <div className="flex items-center">
                      {item.iconLists.map((icon, index) => (
                        <div
                          key={index}
                          className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                          style={{
                            transform: `translateX(-${5 * index + 2}px)`,
                          }}
                        >
                          <img src={icon} alt="icon1" className="p-2" />
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-center items">
                      <p className="flex lg:text-xl md:text-xs text-sm text-purple">
                        Check Live Site
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Projects;
