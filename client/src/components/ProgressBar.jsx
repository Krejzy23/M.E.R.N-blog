import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';


const ProgressBar = ({ text }) => {
  const radius = 70; // Poloměr kružnice
  const angleIncrement = (2 * Math.PI) / text.length; // Úhel mezi znaky
  const circleRef = useRef(null); // Ref pro celý kruh
  const progressBarMaskRef = useRef(null);
  const progressTextRef = useRef(null);

  useGSAP(() => {
    // Logika pro progress bar
    gsap.to(progressBarMaskRef.current, {
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress * 100;
          progressBarMaskRef.current.setAttribute('y', 100 - progress); // Nastavuje pozici masky
          progressBarMaskRef.current.setAttribute('height', progress); // Nastavuje výšku masky
          progressTextRef.current.innerText = `${Math.round(progress)}%`;
        },
      },
    });

    // Rotace textu kolem kruhu
    gsap.to(circleRef.current, {
      rotation: 360,
      duration: 1, // Délka rotace (může být upravena podle potřeby)
      ease: "none",
      repeat: -1, // Nekonečná rotace
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      }
    });
  }, []);

  return (
    <div className="fixed hidden bottom-16 right-16 lg:bottom-16 lg:right-16 md:bottom-16 md:right-16 sm:bottom-16 sm:right-16 w-32 h-32 z-50 md:flex items-center justify-center">
      <div className="relative w-full h-full">
        <svg className="w-full h-full transform rotate-180" viewBox="0 0 100 100">
          <defs>
            <mask id="mask">
              <rect x="0" y="0" width="100" height="100" fill="white" />
              <rect ref={progressBarMaskRef} x="0" y="0" width="100" height="0" fill="black" />
            </mask>
          </defs>
          <circle className="fill-none stroke-gray-300" strokeWidth="2px" cx="50" cy="50" r="45"></circle>
          <circle className="fill-stroke-1" cx="50" cy="50" r="45" mask="url(#mask)"></circle>
        </svg>
        <div
          ref={progressTextRef}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-md font-semibold pointer-events-none"
        >
          0%
        </div>
        <div ref={circleRef} className="absolute inset-0 flex items-center justify-center">
          {text.split("").map((char, index) => {
            const angle = angleIncrement * index;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            return (
              <span
                key={index}
                className="absolute text-lg font-semibold"
                style={{
                  transform: `translate(${x}px, ${y}px) rotate(${angle - Math.PI / 2}rad) rotateZ(180deg)`,
                  transformOrigin: 'center',
                }}
              >
                {char}
              </span>
            );
          })}
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-2 border-gray-300 rounded-full pointer-events-none"></div>
      </div>
    </div>
  );
};

export default ProgressBar;
