import Image from "next/image";
import Section from "../components/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const EmploymentPage: React.FC = () => {
  return (
    <div className="w-full h-fit flex flex-col pt-24 pb-1 overflow-x-hidden">
      <Section className="w-full h-screen flex flex-row justify-center items-center">
        <div className="w-fit h-fit flex flex-col justify-start items-start p-4">
          <h2 className="text-4xl font-bold text-secondary text-left w-fit ">
            Join Our Team
          </h2>
          <p className="text-xl font-bold text-slate-400 w-fit">
            Help us serve up something special,
            <br />
            apply today!
          </p>
        </div>
        <div>
          <Image
            src="/images/DSC_6542.webp"
            alt="Big Joe's Team"
            style={{ objectFit: "cover" }}
            width={1920}
            height={1080}
            className="w-full h-screen filter grayscale"
          />
        </div>
      </Section>
      <Section className="w-full h-fit flex flex-col justify-center items-center">
        <div className="w-full h-fit flex flex-col justify-center items-center p-4">
          <h2 className="text-4xl font-bold text-secondary text-left w-fit">
            Apply
          </h2>
          <p className="text-xl font-bold text-slate-400 w-fit">
            Fill out the form below to apply.
          </p>
        </div>
        <div className="w-full h-fit flex flex-col justify-center items-center p-4">
          <Input type="text" placeholder="John Doe" className="w-full" />
          <Input
            type="email"
            placeholder="johndoe@email.com"
            className="w-full"
          />
          <Input type="tel" placeholder="555-555-5555" className="w-full" />
          <Input
            type="text"
            placeholder="Any questions? Just ask!"
            className="w-full"
          />
          <Button type="submit" color="bg-primary" className="w-full">
            Apply
          </Button>
        </div>
      </Section>
    </div>
  );
};

export default EmploymentPage;
