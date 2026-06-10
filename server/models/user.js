// server/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"], // second value = custom error message
      trim: true, // removes accidental spaces "  John  " → "John"
      minlength: [2, "Name must be at least 2 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, // MongoDB creates an index — fast lookups + prevents duplicates
      lowercase: true, // always stores "John@Gmail.COM" as "john@gmail.com"
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false, // ← IMPORTANT: never return password in queries by default
    },

    role: {
      type: String,
      enum: ["user", "admin"], // only these two values allowed
      default: "user",
    },

    allocatedToken: {
      type: Number,
      default: 5,
    },

    workplaceMode: {
      type: String,
      default: "Remote",
      enum: ["Remote", "On-site", "Hybrid"],
    },

    experienceLevel: {
      type: String,
      default: "Entry-level",
      enum: ["Entry-level", "Junior-level", "Mid-level", "Senior-level"],
    },

    resumeTargetRoleTitle: {
      type: String,
      default: null,
    },

    primaryTechFocus: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true, // auto adds createdAt and updatedAt fields
  },
);

export const User = mongoose.model("User", userSchema);

// userSchema.pre("save", async function () {
//   if (!this.isModified("password")) return;

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };
