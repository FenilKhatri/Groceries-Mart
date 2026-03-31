import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

export const uploadBuffer = ({ buffer, folder }) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        transformation: [{ quality: "auto" }, { fetch_format: "auto" }],
      },
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });

export const deleteByPublicId = async (public_id) => {
  if (!public_id) return;
  return cloudinary.uploader.destroy(public_id);
};