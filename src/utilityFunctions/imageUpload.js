import axios from "axios";

export const uploadImage = async (image) => {
  if (image) {
    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "korfdfrd"); // Replace with your upload preset name

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/djlewzcd5/image/upload",
        formData
      );

      return response.data.secure_url;
    } catch (error) {
      return error;
    }
  }
};

