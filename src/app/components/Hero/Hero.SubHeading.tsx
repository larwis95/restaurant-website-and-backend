import { buttonConfig } from "./Hero.Config";
import Link from "next/link";

const HeroSubHeading: React.FC = () => {
  return (
    <div className="flex gap-2 w-fit pointer-event-auto">
      {buttonConfig.map((button) => (
        <Link
          key={button.href}
          href={button.href}
          className={`flex font-extrabold text-center w-fit ${button.color} ${button.hoverColor} hover:drop-shadow-md border border-border rounded-md hover: hover:rounded-none hover:scale-105 transition-all duration-500 text-${button.textColor} ${button.hoverTextColor} p-4`}
        >
          {button.title}
        </Link>
      ))}
    </div>
  );
};

export default HeroSubHeading;
