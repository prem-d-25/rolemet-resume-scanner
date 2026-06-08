import jwt from 'jsonwebtoken'

// Access token - Short Live 
export const genrateAccessToken = (userId, role)=>{
    return jwt.sign(
        {id: userId, role},
        process.env.JWT_ACCESS_SECRET,
        {expiresIn : process.env.JWT_ACCESS_EXPIRES}
    )
}

// Refresh Token - Long live
export const genrateRefreshToken = (userId)=>{
    return jwt.sign(
        {id: userId},
        process.env.JWT_REFRESH_SECRET,
        {expiresIn: process.env.JWT_REFRESH_EXPIRES}
    )
}