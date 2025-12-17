import { curve1, curve2 } from "../../assets";

export const LeftCurve = () => {
  return (
    <div className="hidden absolute top-1/2 right-full w-[20.25rem] -mt-1 mr-10 pb-20 pointer-events-none lg:block">
      <img src={curve2} width={324} height={152} alt="Curve 2" />
    </div>
  );
};

export const RightCurve = () => {
  return (
    <div className="hidden absolute top-1/2 left-full w-[32.625rem] -mt-10 ml-10 pb-20 pointer-events-none lg:block">
      <img src={curve1} width={522} height={182} alt="Curve 1" />
    </div>
  );
};