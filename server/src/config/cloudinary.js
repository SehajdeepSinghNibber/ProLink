import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import config from "./config.js";

const uploadOnCloudinary = async (filePath) => {
    cloudinary.config({
        cloud_name: config.CLOUDINARY_CLOUD_NAME,
        api_key: config.CLOUDINARY_API_KEY,
        api_secret: config.CLOUDINARY_API_SECRET,
    });

    if (!filePath) {
        return null;
    }

    try {
        const uploadResult = await cloudinary.uploader.upload(filePath);
        fs.unlinkSync(filePath);
        return uploadResult.secure_url;
        
    } catch (error) {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        console.log("Cloudinary upload error:", error);
        return null;
    }
};

export default uploadOnCloudinary;