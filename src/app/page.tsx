import Hero from "./components/Hero";
import Section from "./components/Section";
import SectionText from "./components/Section/Section.Text";
import SectionVideo from "./components/Section/Section.Video";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <Section>
        <SectionText>
          <h2 className="text-3xl">We&apos;re Bigger And Better!</h2>
          <p className="text-l text-muted">
            Opened in 2006, find out why we were voted the Best Pizza in Lapeer
            County.
          </p>
        </SectionText>
        <SectionVideo url="https://www.tiktok.com/@eatbigjoes/video/7245318883664776494" />
      </Section>
    </main>
  );
}
