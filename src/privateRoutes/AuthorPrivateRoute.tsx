import { Outlet } from "react-router-dom";

function AuthorPrivateRoute() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default AuthorPrivateRoute;
