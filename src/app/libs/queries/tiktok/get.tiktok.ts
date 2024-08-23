import { TikTokOembedResponse } from "../../api.types";
export const getTikTok = async (url: string): Promise<TikTokOembedResponse> => {
  const response = await fetch(`https://www.tiktok.com/oembed?url=${url}`);
  const data = await response.json();
  return data;
};
