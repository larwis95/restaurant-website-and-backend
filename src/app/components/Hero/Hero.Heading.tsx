import Image from "next/image";
import HeroSubHeading from "./Hero.SubHeading";

export const HeroHeading = () => {
  return (
    <div className="p-4 absolute w-full flex flex-col items-center justify-center h-full z-[20] gap-4">
      <Image src="/logo.webp" alt="Logo" height={400} width={400} />
      <h1 className="text-4xl font-extrabold text-center drop-shadow-lg  text- text-shadow-sm [text-shadow:_0_4px_4px_rgb(99_102_241_/_0.8)]">
        When Hunger calls, call Big Joe&rsquo;s.
      </h1>
      <HeroSubHeading />
    </div>
  );
};

export default HeroHeading;
