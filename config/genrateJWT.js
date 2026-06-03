const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign(
    { userId }, 
    process.env.JWT_SECRET,
    {expiresIn: "30d",});

  res.cookie("jwt", token, {
    httpOnly: true, // Prevents JavaScript (XSS attacks) from reading this cookie
    secure: process.env.NODE_ENV === "production", // Only sends over HTTPS in production
    sameSite: "strict", // Prevents CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
  });
};

module.exports = generateTokenAndSetCookie;
