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
          delay: i * 0.15,
          duration: 0.6,
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
      <p className="text-green-400 font-mono mb-4">
        # active_modules
      </p>

      <div className="flex flex-wrap gap-3">
        {category.map((cat, i) => (
          <div
            key={cat.id}
            ref={(el) => (refs.current[i] = el)}
            className="
              px-4 py-2
              border border-cyan-500/30
              text-sm font-mono
              bg-black/60
              hover:border-green-400
              transition
            "
            style={{ color: cat.color }}
          >
            {cat.title}
          </div>
        ))}
      </div>
    </div>
  );
}