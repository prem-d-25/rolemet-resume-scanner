import { useForm } from "react-hook-form";
import { loginSchema } from "@/schema/login.schema";
import FormInput from "@/components/form/FormInput";
import { useNavigate } from "react-router-dom";
import { loginApi } from "@/api/auth.api";
import useAuthStore from "@/features/auth/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { CusButton } from "@/components/form/FormButton";
import { ROUTES } from "@/constants/routes";
import AuthLeftPage from "./AuthLeftPage";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });


  const setAuth = useAuthStore((state) => state.setAuth);

  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      const resData = await loginApi(data);
      setAuth({
        accessToken: resData.accessToken,
        user: resData.user
      })

      navigate(ROUTES.HOME)
    }
    catch (error) {
      console.error(`LoginPage.jsx -> ${error}`)
    }

  };



  return (
    <div className="h-screen flex font-sans antialiased">
      <AuthLeftPage />
      <div className="w-full lg:w-[50%] flex items-center justify-center bg-[#ffffff] relative">

        <div className="w-full max-w-sm px-6">
          <div className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 tracking-tight mb-3">
              Sign in
            </h2>
            <p className="text-gray-500 font-light">
              Enter your credentials to access your workspace.
            </p>
          </div>

          {/* Form Section */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit(onSubmit)}>

              <div className="space-y-2">
                <FormInput
                  label="Email"
                  register={register("email")}
                  error={errors.email}
                />
              </div>

              <div className="space-y-2">
                <FormInput
                  label="Password"
                  register={register("password")}
                  error={errors.password}
                  type="password"
                />

                <div className="flex justify-end">
                  <a
                    href="#"
                    className="text-xs font-medium text-gray-400 hover:text-orange-600 transition-colors tracking-wide"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              <div className="pt-4">
                <CusButton
                  label="Enter Workspace"
                  type="submit"
                  className="w-full !py-4 !text-sm font-bold uppercase tracking-[0.1em] shadow-xl shadow-orange-500/10 hover:shadow-orange-500/20 transition-all"
                />
              </div>
            </form>
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100"></div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500 font-light">
                New to the platform?{" "}
                <button
                  type="button"
                  onClick={() => navigate(ROUTES.REGISTER)}
                  className="font-semibold text-gray-900 hover:text-orange-600 transition-colors underline underline-offset-4 decoration-orange-200"
                >
                  Sign Up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;

{/* <form onSubmit={handleSubmit(onSubmit)}>


  <FormInput
    label="Password"
    type="password"
    register={register("password")}
    error={errors.password}
  />

  <button type="submit">Login</button>
</form> */}