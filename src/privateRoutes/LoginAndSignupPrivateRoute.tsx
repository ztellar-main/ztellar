import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../state/store";

const LoginAndSignupPrivateRoute = () => {
  const token = useAppSelector((e) => e.user.token);

  if (token) {
    return <Navigate to="/" />;
  }
  return <Outlet />;


  
};

export default LoginAndSignupPrivateRoute;
