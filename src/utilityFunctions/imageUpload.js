import axios from "axios";
// import { convertDocxToPdf } from "docx-to-pdf";

export const uploadImage = async (image) => {
  if (image) {
    try {
      const formData = new FormData();

      formData.append("upload_preset", "korfdfrd"); // Replace with your upload preset name
      formData.append("resource_type", "raw");
      formData.append("file", image);

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
// export async function convertWordToPdf(wordFile) {
//   const pdfFile = await convertDocxToPdf({ input: wordFile });
//   return pdfFile;
// }
// export async function isWordFile(fileName) {
//   const isWord = /\.(doc|docx)$/i.test(fileName);
//   if (isWord) {
//     const pdfFile = await convertWordToPdf(fileName);
//     const response = await uploadImage(pdfFile);

//     return response;
//   } else {
//     const response = await uploadImage(fileName);
//     return response;
//   }
// }
