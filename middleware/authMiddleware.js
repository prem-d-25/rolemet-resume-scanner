import jwt from 'jsonwebtoken'
import { User } from '../models/User.js';

export const protect = async (req, res, next) => {
  try {
    console.log("yoo")
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith(`Bearer`)) {
      return res.status(401).json({ message: `No token provided` });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)

    const user = await User.findById(decoded.id).select('-password')
    if(!user){
      res.status(401).json({message: `User don't exist`})
    }

    req.user =  user

    
    next()

  } catch (error) {
    if (error.name == "TokenExpiredError")
      return res.status(505).json({ message: `Token Expired` });
    return res.status(505).json({ message: `Invalid Token` });
  }
};


export const restrictTo = (...roles) =>{

    return (req, res, next)=>{
      if(!roles.includes(req.user.role)){
        return res.status(403).json({message: 'Do not have permission to access this feature'})
      }
      next()
    }

}