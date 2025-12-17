import { useRef } from "react";
import gsap from "gsap";
import { category } from "../constants";
import { useGSAP } from "@gsap/react";

export default function ActiveModules() {
  const refs = useRef([]);

  useGSAP(() => {
    refs.current.forEach((el, i) => {
      gsap.fromTo(
        el,
        { y: 20, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          delay: i * 0.12,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        }
      );
    });
  }, []);

  return (
    <div className="mt-12">
      <p className="text-cyan-400 px-5 font-mono mb-3">
        # active_modules
      </p>

      <div className="flex flex-wrap px-3 gap-2 justify-center">
        {category.map((cat, i) => (
          <div
            key={cat.id}
            ref={(el) => (refs.current[i] = el)}
            className="
              px-4 py-2
              text-sm font-mono
              bg-black/60
              border border-cyan-500/30
              text-green-400
              transition-all duration-200
              cursor-default
            "
            style={{
              "--hover-color": cat.color[0],
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = cat.color[0];
              e.currentTarget.style.color = cat.color[0];
              e.currentTarget.style.boxShadow = `0 0 8px ${cat.color[0]}55`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(6,182,212,0.3)";
              e.currentTarget.style.color = "";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {cat.title}
          </div>
        ))}
      </div>
    </div>
  );
}
