import HeroCarousel from "./Hero.Carousel";
import { carouselImages } from "./Hero.Config";

const Hero: React.FC = () => {
  return (
    <div className="relative h-screen w-full bg-cyan-800 bg-opacity-50 overflow-hidden">
      <HeroCarousel items={carouselImages} />
    </div>
  );
};

export default Hero;
