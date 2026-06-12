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

    const allowedUpdates = ["name", "resumeTargetRoleTitle", "primaryTechFocus", "experienceLevel", "workplaceMode"];
    const updatedPayload = {};

    for (const key of allowedUpdates) {
      if (req.body[key]!== undefined) {
        updatedPayload[key] = req.body[key];
      }
    }

    if(Object.keys(updatedPayload).length === 0){
        return res.status(400).json({message: 'At least one field is required to update'})
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updatedPayload,
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if(req.file){
      const fileBase64 = req.file.buffer.toString("base64");
      const fileUrl = `data:${req.file.mimetype};base64,${fileBase64}`;

      const cloudinaryResponse = await cloudinary.uploader.upload(fileUrl, {
        folder: "user_profiles",
        transformation: [
          { width: 500, height: 500, crop: "limit" },
        ],
      });
    }

    res.status(200).json({ success: true, message: "Profile updated successfully", data: user });
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
