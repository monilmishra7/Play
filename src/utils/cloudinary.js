import { v2 as cloudinary } from "cloudinary";
import fs from "fs"


cloudinary.config({ 
  cloud_name: process.enc.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_NAME, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary= async (localFilePath) =>{
  try {
    if(!localFilePath) return null;
    const response= await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto"
    } )
    //file has been uploaded successfully
    console.log("file uploaded on cloud", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath)//remove the locally saved temporary file as the upload operation got failed
    return null;
  }
}



export {uploadOnCloudinary}



