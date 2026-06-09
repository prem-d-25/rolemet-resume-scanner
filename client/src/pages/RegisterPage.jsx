import { useForm } from "react-hook-form";
import { registerSchema } from "@/schema/register.schema.js";
import FormInput from "@/components/form/FormInput";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerApi } from "@/api/auth.api";

function RegisterPage() {
  console.log("RegisterPage.jsx rendered")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      await registerApi(data);
      navigate("/login")
    }
    catch (error) {
      console.error(`RegisterPage.jsx -> ${error}`)
    }

  };


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        label="Name"
        register={register("name")}
        error={errors.name}
      />

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
export default RegisterPage;
