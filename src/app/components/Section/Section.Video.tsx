import { ISectionVideoProps } from "./Section.interfaces";
import { getTikTok } from "@/lib/queries/tiktok/get.tiktok";

const SectionVideo: React.FC<ISectionVideoProps> = async ({ url }) => {
  const [loading, data] = await getTikTok(url);
  const { html } = data;

  return (
    <div className="sm:w-full md:w-full lg:w-1/2 flex justify-center">
      {loading && <p>Loading...</p>}
      <div dangerouslySetInnerHTML={{ __html: html }} className="w-80" />
    </div>
  );
};

export default SectionVideo;
