const { generateToken } = require("../config/generateToken");
const User = require("../models/User");
const { ApiError } = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

const asyncHandler =require("../utils/AsyncHandler")

const registerUser = asyncHandler(async(req, res) =>{

    // get name and email
    // check if the user with the email already exists or not
    // if user already exists throw error
    // if not create a new user


    const {name, email} = req.body;
    
    if(!name || !email){
        throw new ApiError(404,'Name or email is required')
    }
    
    const userExists= await User.findOne({email})

    if (userExists){
        throw new ApiError(400, 'User already exists with this email')
    }
    const user= await User.create({
        name,
        email,

    })
    return res.status(200).json(new ApiResponse(200,user,"User create successfully"))

  

})

  const login = asyncHandler(async(req, res) =>{

        const { name, email } = req.body;

        const user = await User.findOne({email})

        if(!user){
            throw new ApiError(404, 'User with this email does not exist')
        }
        
        if(user.name !== name){
            throw new ApiError(400, 'Name does not match with the user')
        }

         const token = generateToken(user._id)

         res.status(200).json(new ApiResponse(200, {user, token}, "User logged in successfully"))    
    })
module.exports={ registerUser, login }