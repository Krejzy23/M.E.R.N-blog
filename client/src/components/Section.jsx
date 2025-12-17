import SectionSvg from "../svg/SectionSvg";

const Section = ({
  className = "",
  id,
  crosses,
  crossesOffset,
  customPaddings,
  showVerticalLines = true,
  children,
}) => {
  return (
    <div
      id={id}
      className={`relative ${customPaddings || `py-10 lg:py-16 xl:py-20 ${crosses ? "lg:py-32 xl:py-40" : ""}`} ${className}`}
    >
      {children}

      {showVerticalLines && (
        <>
          <div className="hidden absolute top-0 left-5 w-[0.0625rem] h-full bg-stroke-1 pointer-events-none lg:block lg:left-[1.875rem] xl:left-10" />
          <div className="hidden absolute top-0 right-5 w-[0.0625rem] h-full bg-stroke-1 pointer-events-none lg:block lg:right-[1.875rem] xl:right-10" />
        </>
      )}
      {crosses && (
        <>
          <div
            className={`hidden absolute top-0 left-[1.875rem] h-[0.0625rem] bg-stroke-1 pointer-events-none lg:block xl:left-10 right-10 ${crossesOffset}`}
          />
          <SectionSvg crossesOffset={crossesOffset} />
        </>
      )}
    </div>
  );
};

export default Section;