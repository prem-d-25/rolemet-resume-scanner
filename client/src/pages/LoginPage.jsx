import { useForm } from "react-hook-form";
import { loginSchema } from "@/schema/login.schema";
import FormInput from "@/components/form/FormInput";
import { useNavigate } from "react-router-dom";
import { loginApi } from "@/api/auth.api";
import useAuthStore from "@/features/auth/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { CusButton } from "@/components/form/FormButton";

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

      navigate("/dashboard")
    }
    catch (error) {
      console.error(`LoginPage.jsx -> ${error}`)
    }

  };



  return (
    <div className="h-screen flex font-sans antialiased">
      <div className="hidden lg:flex bg-[#0f0f0f] w-[50%] items-center justify-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
        <div className="absolute w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="relative z-10 w-full max-w-md px-12">
          <div className="mb-10 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-orange-600 to-orange-400 shadow-2xl shadow-orange-500/20">
            <span className="text-white text-3xl font-bold italic">P</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-white text-5xl font-light tracking-tight leading-[1.1]">
              The core of your <br />
              <span className="font-semibold">daily operations.</span>
            </h1>

            <p className="text-gray-400 text-lg font-light max-w-sm">
              Seamlessly track tasks, attendance, and team performance in one
              unified workspace.
            </p>
          </div>

          {/* Decorative minimalist progress line */}
          <div className="mt-16 flex items-center gap-4">
            <div className="h-[1px] w-12 bg-orange-500"></div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-medium">
              Authenticated Session
            </span>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-[50%] flex items-center justify-center bg-[#ffffff] relative">
        <div className="absolute top-0 right-0 p-8 text-[10px] font-mono text-gray-300 tracking-widest uppercase">
          Access Portal // 01
        </div>

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
                  onClick={() => {
                    // localStorage.setItem("token", true)
                    // navigate(Route.Dashboard)
                  }}
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
                  onClick={() => navigate(Route.Register)}
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