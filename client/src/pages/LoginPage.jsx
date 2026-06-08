import { useForm } from "react-hook-form";
import { loginSchema } from "@/schema/login.schema";
import FormInput from "@/components/form/FormInput";
import { useNavigate } from "react-router-dom";
import { loginApi } from "@/api/auth.api";
import useAuthStore from "@/features/auth/authStore";
import { zodResolver } from "@hookform/resolvers/zod";

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
    try{
      const resData = await loginApi(data);
      setAuth({
        accessToken: resData.accessToken,
        user: resData.user
      })

      navigate("/dashboard")
    } 
    catch(error){
      console.error(`LoginPage.jsx -> ${error}`)
    } 
  
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        label="Email"
        register={register("email")}
        error={errors.email}
      />

      <FormInput
        label="Password"
        type="password"
        register={register("password")}
        error={errors.password}
      />

      <button type="submit">Login</button>
    </form>
  );
}
export default LoginPage;
