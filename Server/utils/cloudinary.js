// Path to your configuration file
import fs from "fs";
import cloudinary from "../config/cloudinoryConfig.js";

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      return {
        success: false,
        message: "localFilePath is missing",
      };
    }
    const res = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "image",
    });
    fs.unlinkSync(localFilePath);
    return {
      success: true,
      url: res.url,
    };
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove locally saved file
    console.log(error);
    return {
      success: false,
      message: "Error in uploading image",
      error: error.message,
    };
  }
};

export default uploadOnCloudinary;
