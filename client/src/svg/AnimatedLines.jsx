import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";


const AnimatedLines = () => {
  const pathRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      pathRef.current,
      { strokeDashoffset: 1185.67, strokeDasharray: 1185.67 },
      {
        strokeDashoffset: 0,
        duration: 0.5,
        ease: "power1.inOut",
        visibility: "visible",
      }
    );
  }, []);

  return (
    <div className="absolute -mt-20 top-0 left-0 w-full h-full flex justify-center items-center pointer-events-none z-50">
      <svg
        viewBox=" 0 0 441.31 249.44"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "70%", height: "auto" }}
      >
        <path
          ref={pathRef}
          d="M49.21,193.1c-7.62-14.96-10.07-32.02-7.67-48.44,2.63-16.56,10.13-31.33,19.71-44.14,9.63-12.79,21.4-23.51,33.85-32.93,6.21-4.72,12.68-9.07,19.24-13.18l4.89-3.12c1.66-1.01,3.34-1.93,5.02-2.92,3.37-1.89,6.66-3.95,10.09-5.73C174.19,21.19,218.87,8.82,264.1,6.41c22.62-1.16,45.36.11,67.71,3.89,11.18,1.72,22.31,4.31,33.31,7.86,10.96,3.6,21.74,8.36,31.65,14.86,17.84,11.62,32.33,29.7,37.13,51.5,2.38,10.84,1.75,22.58-1.79,33.06-1.61,5.33-4.15,10.25-6.84,14.97-2.85,4.64-6,9.03-9.5,13.02-14.02,16.05-31.55,27.59-49.01,37.56-17.5,10.12-35.71,19.03-54.42,26.71-17.55,7.3-35.63,13.25-53.96,18.22-18.35,4.91-36.99,8.9-55.84,11.38-18.85,2.53-37.87,3.88-56.91,4l-14.29-.16-14.28-.74c-9.55-.55-19.23-1.68-28.8-3.48-16.48-3.2-33.17-8.37-47.99-18.17-14.76-9.63-27.1-24.7-31.7-42.41-4.78-17.56-2.54-36.01,4.05-52.17,3.33-8.1,7.8-15.76,13.4-22.51,5.53-6.72,11.93-12.63,18.89-17.69,6.52-4.78,14.1-9.47,22.31-13.3"
          fill="none"
          stroke="#ff3b00"
          strokeMiterlimit="10"
          strokeWidth="8"
          style={{ visibility: "hidden" }}
        ></path>
      </svg>
    </div>
  );
};
export default AnimatedLines;
