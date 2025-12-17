import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import Hero from "../components/Hero";
import ActiveModules from "../components/ActiveModules";
import Section from "../components/Section";
import Tagline from "../components/Tagline";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import ProgressBar from "../components/ProgressBar";
import LogHeader from "../components/LogHeader";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getPosts");
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <div className="flex flex-col max-w-screen-2xl mx-auto ">
        <Section
          crosses
          className="pt-[2rem] mt-[1.25rem]"
          customPaddings
          showVerticalLines={true}
        >
          <Hero />
        </Section>
      </div>

      <Section
        className="posts-section mx-auto bg-[#0b0f19] text-green-400 z-30"
        crosses
        crossesOffset
        customPaddings
      >
        <div className="max-w-6xl mx-auto flex flex-col gap-8 py-7">
          <Tagline className="text-xl font-mono text-green-400">
            #latest_logs
          </Tagline>
          <ActiveModules />
          {posts && posts.length > 0 && (
            <div className="flex flex-col gap-6 ">
              <div className="relative z-40">
                <LogHeader
                  command="tail --latest system.log"
                  result={`showing ${posts.length} entries`}
                />
                <h2 className="absolute h2 top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 max-w-lg lg:text-5xl text-3xl tracking-[0.3rem] font-mono font-semibold text-green-400 border border-cyan-500/30 bg-black/80 backdrop-blur z-50">
                  SYSTEM LOGS
                </h2>
              </div>

              <div className="flex flex-wrap pt-24 pb-24 gap-4 justify-center p-5 border-stroke-1 border-1">
                {posts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
              <Link
                to={"/search"}
                className="relative left-1/2 -translate-x-1/2 -translate-y-1/2 p-5 max-w-lg border border-cyan-500/30 text-cyan-400 font-mono bg-black/80 backdrop-blur hover:bg-cyan-500/10 hover:text-green-400 transition text-center text-xl z-50"
              >
                View all logs
              </Link>
            </div>
          )}
        </div>
      </Section>

      <Section crosses crossesOffset>
        <div className="max-w-[77.5rem] mx-auto px-5 md:px-10 lg:px-16 xl:max-w-[87.5rem]">
          <Tagline className="flex justify-start text-xl font-mono text-green-400">
            #open_channel
          </Tagline>
          <div className="flex justify-center p-5 items-center mt-36">
            <div className="flex justify-center items-center p-10">
              <div className="flex p-5 pb-32 z-30">
                <CallToAction />
              </div>
            </div>
          </div>
        </div>
      </Section>
      <ProgressBar text={"Check my work! Contact Me!"} />
    </div>
  );
}
