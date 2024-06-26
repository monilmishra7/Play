import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"






 const registerUser = asyncHandler(async (req, res )=> {
  //get user detail from frontend
  //validation not empty
  //check if user already exists: username, email
  // check for images and check for avatar
  //upload them to cloudinary
  ///create user object - create entry in db
  //remove passsword and refresh tolken field from resposnse
  //check for user creation
  //return response



 const {fullName, email, username, password }=req.body
 console.log("email",email);
 if(
  [fullName, email, username, password].some((field)=> field?.trim()==="")
 ){
  throw new ApiError(400,"All fields are required")
 }

const existedUser = User.findOne({
  $or: [{email}, {username}]
})
if (existedUser) {
  throw new ApiError(409," User already existed")
}

const  avatarLocalPath = req.files?.avatar[0]?.path;
const  coverImageLocalPath = req.files?.coverImage[0]?.path;

if (!avatarLocalPath) {
  throw new ApiError(400, "Avatar file is required")
}

const avatar = await uploadOnCloudinary(avatarLocalPath)
const coverImage = await uploadOnCloudinary(coverImageLocalPath)

if (!avatar) {
  throw new ApiError(400, " Avatar is required")
}

const user = await User.create({
  fullName,
  avatar: avatar.url,
  coverImage : coverImage?.url || "",
  email,
  password,
  username: username.toLowerCase()
})

const createdUser = await User.findById(_id).select(
  "-password -refresToken"
)
if(!createdUser){
  throw new ApiError(500, "something went wrong while user entry")
}

return res.status(201).json(
  new ApiResponse(200, createdUser, "User registerd successfully")
)

})


export { registerUser }