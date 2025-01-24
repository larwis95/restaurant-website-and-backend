import Section from "../components/Section";
import { Timeline } from "@/components/ui/timeline";
import timeLineData from "./timelinedata";

const AboutPage = () => {
  return (
    <main className="flex flex-col items-center justify-center w-full flex-1 px-10 xl:px-20 lg:px-20 md:px-20 sm:px-10 py-20">
      <Section className="flex flex-row flex-wrap w-full justify-start gap-2">
        <h2 className="text-4xl font-bold text-secondary w-full">About Us</h2>
        <p className="text-xl xl:w-1/3 lg:w-1/3 md:w-1/2sm:w-full ">
          We came along in 2006 with a dream: serve up great, fresh food.
          Let&apos;s just say we&apos;ve been doing that for a while now.
          We&apos;re proud of our history and excited about our future.
        </p>
        <p className="text-xl w-full">
          Let&apos;s take a look at how we got here.
        </p>
      </Section>
      <Section className="flex flex-col w-full justify-start gap-2">
        <Timeline data={timeLineData} />
      </Section>
    </main>
  );
};

export default AboutPage;
