import getCloudinaryInstance from "../config/cloudinary.js";
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
    const allowedUpdates = [
      "name",
      "resumeTargetRoleTitle",
      "primaryTechFocus",
      "experienceLevel",
      "workplaceMode",
    ];
    const updatedPayload = {};

    // Build text field updates
    for (const key of allowedUpdates) {
      if (req.body[key] !== undefined) {
        updatedPayload[key] = req.body[key];
      }
    }

    // PRODUCTION FIX: Block only if BOTH text fields AND the file are missing
    if (Object.keys(updatedPayload).length === 0 && !req.file) {
      return res
        .status(400)
        .json({ message: "At least one field or image is required to update" });
    }

    // Process image buffer stream
    if (req.file) {
      const cloudinary = getCloudinaryInstance();

      const uploadToCloudinary = () => {
        return new Promise((resolve, reject) => {
          const cldStream = cloudinary.uploader.upload_stream(
            {
              folder: "user_profile",
              allowed_formats: ["jpg", "png", "jpeg", "webp"],
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            },
          );

          cldStream.end(req.file.buffer);
        });
      };

      // Wrap in a clean try-catch block for network resilience
      try {
        const cloudinaryResponse = await uploadToCloudinary();
        updatedPayload.profileImage = cloudinaryResponse.secure_url;
      } catch (uploadError) {
        console.error("Cloudinary Upload Stream Error:", uploadError);
        return res
          .status(502)
          .json({ message: "Failed to upload image to cloud storage" });
      }
    }

    // Atomic update operation on Database
    const user = await User.findByIdAndUpdate(req.user._id, updatedPayload, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: user,
    });
  } catch (error) {
    console.error("System Error in editProfile controller:", error); // Vital for production monitoring
    return res.status(500).json({ message: "Internal server error" });
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
