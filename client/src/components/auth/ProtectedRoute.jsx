import Loader from "@/components/common/Loader";
import useAuthStore from "@/features/auth/authStore";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const accessToken = useAuthStore((state) => state.accessToken);

  const isInitializing = useAuthStore((state) => state.isInitializing);

  if (isInitializing) {
    return <Loader/>
  }

  if (accessToken) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;
