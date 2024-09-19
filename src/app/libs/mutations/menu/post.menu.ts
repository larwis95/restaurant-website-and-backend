import getErrorMessage from "@/lib/getErrorMessage";

export const postMutationForMenu = async (name: string) => {
  try {
    const response = await fetch(`http://localhost:3000/api/menu`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    const data = await response.json();
    if ("error" in data) {
      throw new Error(data.error);
    }
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
