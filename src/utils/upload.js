import { newRequest } from "./request";

export const upload = async (file) => {
  const formData = new FormData();
  formData.append("assets", file);

  try {
    const { data: response } = await newRequest.post(
      "/services/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    // It returns a URL of uploaded image or file
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
