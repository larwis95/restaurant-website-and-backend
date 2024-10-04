import Hero from "./components/Hero";
import Section from "./components/Section";
import SectionText from "./components/Section/Section.Text";
import SectionVideo from "./components/Section/Section.Video";
import Specials from "./components/Specials";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <Section className="w-full flex flex-row flex-wrap justify-center items-center p-24 xl:p-80 lg:p-24 md:p-24 sm:p-24 border-b border-border">
        <SectionText className="sm:w-full md:w-1/2 lg:w-1/2  text-2xl text-secondary">
          <h2 className="text-4xl font-bold">We&apos;re Bigger And Better!</h2>
          <p className="text-2xl text-slate-400 w-full xl:w-3/4 lg:w-3/4 md:w-3/4 sm:w-full">
            Founded in 2006, find out why we were voted the Best Pizza in Lapeer
            County.
          </p>
        </SectionText>
        <SectionVideo url="https://www.tiktok.com/@eatbigjoes/video/7245318883664776494" />
      </Section>

      <Specials />
    </main>
  );
}
