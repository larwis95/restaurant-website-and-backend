import Image from "next/image";
import HeroSubHeading from "./Hero.SubHeading";

export const HeroHeading = () => {
  return (
    <div className="absolute w-full xl:w-fit lg:w-fit md:w-fit flex flex-col items-center justify-center h-full z-[20] gap-4">
      <div className="flex flex-col w-full p-0 xl:p-2 lg:p-2 md:p-2-v items-center justify-center  bg-black bg-opacity-40 rounded-md gap-2 drop-shadow-lg">
        <Image src="/logo.webp" alt="Logo" height={400} width={400} />
        <h1 className="text-4xl font-extrabold text-center drop-shadow-lg  text- text-shadow-sm [text-shadow:_0_4px_4px_rgb(99_102_241_/_0.8)]">
          When Hunger calls, call Big Joe&rsquo;s.
        </h1>
        <HeroSubHeading />
      </div>
    </div>
  );
};

export default HeroHeading;
