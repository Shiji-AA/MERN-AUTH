import asyncHandler from 'express-async-handler';
import Admin from '../models/adminModel.js';
import User from '../models/userModel.js';
import generateAdminToken from '../utils/generateAdminToken.js';

// @desc Auth user/set token====login
//route POST /api/admin/auth
//access  Public

const authAdmin = asyncHandler(async(req, res) => {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    console.log(admin,"====admin")
    if (admin && admin.password === password) {
        generateAdminToken(res, admin._id);
        res.status(201).json({
            _id: admin._id,
            email: admin.email,
        });
    } else {
        res.status(401);
        throw new Error('Invalid Email or Password');
    }
});
// @desc Logout user
//route POST /api/admin/logout
//access  Public
    const logoutAdmin=asyncHandler(async(req,res)=>{
        res.cookie('jwtAdmin','',{    //this line sets a cookie, named jwtAdmin, with empty value
            httpOnly:true,            //makes the cookie accessible only through HTTP(S) requests 
            expires:new Date(0)
        })
            res.status(200).json({message:'Admin Logged out '}) //to centralize error management.
            })
            
// @desc getAllUser
//route GET /api/admin/getAllUser
//access  Public  
const getAllUser = asyncHandler(async(req,res) => {
    const userData =  await User.find({}, { name: 1, email: 1 ,profileImageName:1})
   if(userData && userData.length > 0){
        res.status(200).json(userData)
    }else{
        res.status(400)
        throw new Error("Error Fetching data")
    }
})
// @desc updateUserData
//route PUT /api/admin/updateUserData
//access  Private  
const updateUserData = asyncHandler(async(req,res) => {
    const userId  = req.body.userId 
    const user =  await User.findById(userId)
    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email

    const updatedUser = await user.save();  //user.save returns a promise updatedUser

    res.status(200).json({
        _id:updatedUser._id,
        name:updatedUser.name,
        email:updatedUser.email
    })
    }else{
        res.status(400)
        throw new Error('User Not found')
    }
})

    // @desc delete User
//route delete /api/admin/deleteUser
//access  Public  

const deleteUser = asyncHandler(async(req,res)=>{
    const userId = req.body.userId
    const deletedData = await User.findByIdAndDelete(userId)   //The deleted user data (before deletion) is stored in the deleted variable.
    if(deletedData){
        res.status(200).json({success:true,message:'UserData Deleted Successfully'})
    }else{
        res.status(404).json({success:false,message:'User delete Failed'})
    }
})
// @desc add New UserUser 
//route POST /api/admin/addNewUserUser 
//access  Public  
const addNewUser = asyncHandler(async(req,res) =>{
    console.log(req.body);
    const {name,email,password} = req.body  //client is sending these fields in the request body when creating a new user.
    const userExist = await User.findOne({email})
    if(userExist){
        res.status(400);
        throw new Error('User Already Exists')
    }
    const user = await User.create({  //If the user does not already exist, it creates a new user in the database using 
        name,
        email,
        password
    })
    if(user){
        res.status(201).json({   //If user creation is successful, it responds with the user details and a 201 status code (created).
            _id:user._id,
            name:user.name,
            email:user.email,
            profileImageName:user.profileImageName

        })
    }else{
        res.status(400)
        throw new Error('Invalid User Data')
    }
})
export{
    authAdmin,
    logoutAdmin,
    getAllUser,
    updateUserData,
    deleteUser,
    addNewUser,
};