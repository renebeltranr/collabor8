import {} from "cloudinary-react";
import axios from "axios";

export const upVideoToCloudinary = async (blob) => {
  const url = String(process.env.REACT_APP_CLOUDINARY_UPLOAD_URL);
  let cloudinaryData = {};
  const formData = new FormData();
  formData.append("file", blob);
  formData.append("upload_preset", String(process.env.REACT_APP_CLOUDINARY_PRESET));
  await axios.post(url, formData).then((response) => {
    cloudinaryData = response.data;
  });
  return cloudinaryData;
};
