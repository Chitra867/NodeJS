const User = require("../models/User");
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
module.exports={registerUser}