import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

// Schema, API, Hooks and Constants imports
import { registerSchema } from "@/schema/register.schema"; // Ensure this schema contains validation rules for name, email, and password
import { registerApi } from "@/api/auth.api";
import useAuthStore from "@/features/auth/authStore";
import FormInput from "@/components/form/FormInput";
import { CusButton } from "@/components/form/FormButton";
import LogoBlock from "@/components/common/LogoBlock";
import { ROUTES } from "@/constants/routes";
import AuthLeftPage from "./AuthLeftPage";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const resData = await registerApi(data);
      setAuth({
        accessToken: resData.accessToken,
        user: resData.user,
      });

      alert("Registration successful! Redirecting to your dashboard...");

      navigate(ROUTES.HOME);
    } catch (error) {
      console.error(`RegisterPage.jsx -> ${error}`);
    }
  };

  return (
    <div className="h-screen flex font-sans antialiased bg-[#0f0f0f]">

      <AuthLeftPage register={true} />

      <div className="w-full lg:w-[50%] flex items-center justify-center bg-white relative">
        <div className="w-full max-w-sm px-6">
          <div className="mb-10">
            <h2 className="text-3xl font-semibold text-gray-900 tracking-tight mb-2">
              Create Account
            </h2>
            <p className="text-gray-500 text-sm font-light">
              Register to launch your session.
            </p>
          </div>

          {/* Registration Input Controls */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <FormInput
              label="Full Name"
              register={register("name")}
              error={errors.name}
              placeholder="Enter your operational name"
            />

            <FormInput
              label="Email Address"
              register={register("email")}
              error={errors.email}
              type="email"
              placeholder="name@domain.com"
            />

            <FormInput
              label="Secure Password"
              register={register("password")}
              error={errors.password}
              type="password"
              placeholder="••••••••"
            />

            <div className="pt-4">
              <CusButton
                label="Initialize Environment"
                type="submit"
                className="w-full !py-4 !text-sm font-bold uppercase tracking-[0.1em] shadow-xl shadow-orange-500/10 hover:shadow-orange-500/20 transition-all"
              />
            </div>

          </form>

          {/* Minimal Break Line */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100" />
            </div>
          </div>

          {/* Redirection Link Node */}
          <div className="text-center">
            <p className="text-sm text-gray-500 font-light">
              Already registered?{" "}
              <button
                type="button"
                onClick={() => navigate(ROUTES.LOGIN)}
                className="font-semibold text-gray-900 hover:text-orange-600 transition-colors underline underline-offset-4 decoration-orange-200 focus:outline-none"
              >
                Sign In
              </button>
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}

export default RegisterPage;