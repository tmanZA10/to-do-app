import {Outlet} from "react-router-dom";
import AuthAxiosProvider from "../context/AuthAxiosContext.tsx";


function AuthLayout() {
  return (
    <AuthAxiosProvider>
      <Outlet />
    </AuthAxiosProvider>
  );
}

export default AuthLayout;