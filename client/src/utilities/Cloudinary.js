import {} from 'cloudinary-react';
import axios from 'axios';

export const upAudioToCloudinary = async (blob) => {
  const url = 'https://api.cloudinary.com/v1_1/dvyn9lzkf/upload';
  let cloudinaryData = {};
  const formData = new FormData();
  formData.append('file', blob);
  formData.append('upload_preset', 'acgvtxok')
  await axios.post(url, formData).then((response) => {
    cloudinaryData = response.data
  })
  return cloudinaryData;
}