export const HeroChevron: React.FC = () => {
  const handleChevronClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };
  return (
    <div className="absolute bottom-0 left-0 right-0 flex justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-white hover:text-secondary hover:scale-105 transition-all cursor-pointer z-50"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        onClick={handleChevronClick}
      >
        <filter id="drop-shadow">
          <feDropShadow dx="0.2" dy="0.4" stdDeviation="0.2" />
        </filter>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
          filter="url(#drop-shadow)"
        />
      </svg>
    </div>
  );
};

export default HeroChevron;
