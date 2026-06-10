import Loader from "@/components/common/Loader";
import useAuthStore from "@/features/auth/authStore";
import { ROUTES } from "@/constants/routes";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const accessToken = useAuthStore((state) => state.accessToken);

  const isInitializing = useAuthStore((state) => state.isInitializing);

  if (isInitializing) {
    return <Loader />
  }

  if (accessToken) {
    return <Navigate to={ROUTES.HOME} replace />;
  }


  return children;
};

export default ProtectedRoute;
