import { newRequest } from "./request";

export const upload = async (file) => {
  const formData = new FormData();
  formData.append("assets", file);

  try {
    const { data } = await newRequest.post("/services/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const url = data.data;
    return url;
  } catch (err) {
    console.log(err);
  }
};
