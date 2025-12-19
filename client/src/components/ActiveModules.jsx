import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { category } from "../constants";

gsap.registerPlugin(ScrollTrigger);

export default function ActiveModules() {
  const refs = useRef([]);
  const containerRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        refs.current,
        { y: 40, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.45,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true,
            invalidateOnRefresh: true,
          },
        }
      );
    }, containerRef);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <div className="mt-12" ref={containerRef}>
      <p className="text-sm md:text-base text-cyan-400 px-5 font-mono mb-3">
        # active_modules
      </p>

      <div className="flex flex-wrap px-2 gap-2 justify-center">
        {category.map((cat, i) => (
          <div
            key={cat.id}
            ref={(el) => (refs.current[i] = el)}
            className="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm font-mono bg-black/80 border border-cyan-500/30 text-green-400"
          >
            {cat.title}
          </div>
        ))}
      </div>
    </div>
  );
}
