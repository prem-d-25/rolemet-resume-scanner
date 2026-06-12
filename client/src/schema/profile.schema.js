import { experienceLevelOptions, workplaceModeOptions } from "@/pages/profile/ProfileExtra";
import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  resumeTargetRoleTitle: z.string().min(2, "Target role is required").max(50),
  primaryTechFocus: z.string().min(2, "Tech focus is required").max(50),
  experienceLevel: z
    .string()
    .refine(
      (val) =>
        experienceLevelOptions.includes(
          val,
        ),
      { message: "Invalid experience level selected" },
    ),
  workplaceMode: z
    .string()
    .refine((val) => workplaceModeOptions.includes(val), {
      message: "Invalid workplace mode selected",
    }),

  profileImage: z.string().nullable().optional(),
});