import { ISectionVideoProps } from "./Section.interfaces";
import { getTikTok } from "../../libs/queries/tiktok/get.tiktok";

const SectionVideo: React.FC<ISectionVideoProps> = async ({ url }) => {
  const video = await getTikTok(url);
  const html = video.html;

  return (
    <div className="sm:w-full md:w-full lg:w-1/2 flex justify-center">
      <div dangerouslySetInnerHTML={{ __html: html }} className="w-80" />
    </div>
  );
};

export default SectionVideo;
