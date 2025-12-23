import { useLocation, Navigate } from "react-router-dom";
import useLoginStore from "@/store/user";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { userInfo } = useLoginStore(),
    location = useLocation();
  return Boolean(userInfo) ? children : <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;
