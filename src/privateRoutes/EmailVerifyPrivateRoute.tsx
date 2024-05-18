import { Navigate, Outlet, useLocation } from "react-router-dom";

const EmailVerifyPrivateRoute = () => {
  const location = useLocation();
  const userData = location.state;

  // DATA
  const email = userData?.email;
  const fname = userData?.fname;
  const lname = userData?.lname;
  const mobileNumber = userData?.mobileNumber;
  const password = userData?.password;

  console.log({email,fname,lname,mobileNumber,password})

  if(!email || !fname || !lname || !mobileNumber || !password){
    return <Navigate to='/' />
  }

  return <Outlet />;
  
};

export default EmailVerifyPrivateRoute;
