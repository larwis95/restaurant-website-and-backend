import getErrorMessage from "../error";

export const postImageMutation = async (file: File) => {
  try {
    if (!file) {
      throw new Error("No file provided");
    }
    const response = await fetch(`/api/upload/image?filename=${file.name}`, {
      method: "POST",
      body: file,
    });
    if (!response.ok) {
      throw new Error("Failed to upload image");
    }
    return response.json();
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
