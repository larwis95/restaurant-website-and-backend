import getErrorMessage from "@/lib/getErrorMessage";

import { TikTokGetResponse } from "../../api.types";
export const getTikTok = async (url: string): Promise<TikTokGetResponse> => {
  let loading = true;
  let data = null;
  try {
    const response = await fetch(`https://www.tiktok.com/oembed?url=${url}`);
    data = await response.json();
    loading = false;
  } catch (error) {
    const message = getErrorMessage(error);
    loading = false;
    throw new Error(`Error fetching TikTok data: ${message}`);
  }

  return [loading, data];
};
