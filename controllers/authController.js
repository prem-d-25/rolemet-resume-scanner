// server/controllers/authController.js
import bcrypt from 'bcryptjs'
import { User } from '../models/User.js'

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters' })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use' })
    }

    // 4. Hash the password — NEVER store plain text
    const salt = await bcrypt.genSalt(10)       // generate random salt
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    })

  } catch (error) {
    console.error('Register error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}


// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
// };




// exports.registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: "User already registered with this email" });
//     }

//     const user = await User.create({ name, email, password });

//     if (user) {

//       generateTokenAndSetCookie(res, user._id)

//       return res.status(201).json({
//         _id: user._id,
//         name: user.name,
//         email: user.email
//       });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Registration failed", error: error.message });
//   }
// };

// exports.loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });

//     if (user && (await user.matchPassword(password))) {
//       return res.json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         token: generateToken(user._id),
//       });
//     } else {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Login failed", error: error.message });
//   }
// };

// exports.logoutUser = async (req, res) => {
//   res.cookie("jwt", "", {
//     httpOnly: true,
//     expires: new Date(0), // Instantly expires the cookie
//   });
//   res.status(200).json({ message: "Logged out successfully" });
// };