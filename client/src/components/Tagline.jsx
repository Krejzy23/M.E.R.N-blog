import brackets from "../svg/Brackets";

const Tagline = ({ className, children }) => {
  return (
    <div className={`font-light text-xs tracking-tagline uppercase flex items-center ${className || ""}`}>
      {brackets("left")}
      <div className="mx-3 text-n-3">{children}</div>
      {brackets("right")}
    </div>
  );
};

export default Tagline;