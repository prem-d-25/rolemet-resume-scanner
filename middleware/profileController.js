import { User } from "../models/User.js"

export const getProfile = (req, res)=>{
    try{

        console.log(req);
        res.status(200).json({message: 'success', data: {user: req.user}})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message: 'Server error'})
    }
}

export const getAllUserData = async (req, res)=>{
    try{

        const userData = await User.find().select("-password")

        res.status(200).json({message: 'success', data: {users: userData}})
    }
    catch(error){
        console.error(error)
        res.status(500).json({message: 'Server error'})
    }
}