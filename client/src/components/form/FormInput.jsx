import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

// 1. Remove forwardRef completely since you pass register prop directly
const FormInput = ({
  label,
  error,
  type = "text",
  className = "",
  divClass = "",
  id,
  register, // Destructured here
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  const baseInputStyles = "w-full border rounded-lg px-3 py-2 transition-colors duration-200 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed";
  const stateStyles = error
    ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
    : "border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500";

  return (
    <div className={`flex flex-col gap-1.5 w-full ${divClass}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700 cursor-pointer">
          {label}
        </label>
      )}

      <div className="relative rounded-lg shadow-sm">
        <input
          id={id}
          type={inputType}
          className={`${baseInputStyles} ${stateStyles} ${isPassword ? "pr-10" : ""} ${className}`}
          {...register} // 2. This safely injects the ref, onChange, and onBlur features
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        )}
      </div>

      {error?.message && (
        <p className="text-xs font-medium text-red-500 mt-0.5">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default FormInput;