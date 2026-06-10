import { User } from "../models/User.js";

export const getProfile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


export const editProfile = async (req, res) => {
  try {
    const { name, resumeTargetRoleTitle, primaryTechFocus, experienceLevel, workplaceMode } = req.body;

    if(!name || !resumeTargetRoleTitle || !primaryTechFocus || !experienceLevel || !workplaceMode){
        return res.status(400).json({message: 'All fields are required'})
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, resumeTargetRoleTitle, primaryTechFocus, experienceLevel, workplaceMode },
      { new: true }
    );

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllUserData = async (req, res) => {
  try {
    const userData = await User.find().select("-password");

    res.status(200).json({ message: "success", data: { users: userData } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
