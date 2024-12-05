interface ArrowProps {
  direction: "up" | "down";
  className: string;
}

const Arrow: React.FC<ArrowProps> = ({ direction, className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {direction === "up" ? (
        <polyline points="18 15 12 9 6 15"></polyline>
      ) : (
        <polyline points="6 9 12 15 18 9"></polyline>
      )}
    </svg>
  );
};

export default Arrow;
