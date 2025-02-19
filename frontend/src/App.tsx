import { createBrowserRouter, RouterProvider } from "react-router-dom"
import MainLayout from "./layouts/MainLayout.tsx"
import { SignUpFormAction } from "./components/signupform/SignUpForm"
import {LogInAction} from "./components/loginform/LoginForm.tsx";
import NotFound from "./pages/notfound/NotFound.tsx";
import Home from "./pages/Home.tsx";
import LogIn from "./pages/login/LogIn.tsx";
import SignUp from "./pages/signup/SignUp.tsx";
import AuthProvider from "./context/AuthContext.tsx";
import AuthLayout from "./layouts/AuthLayout.tsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <NotFound />,
      children: [
        {
          path: "",
          element: <Home />
        },
      ]
    },
    {
      path: "auth",
      element: <AuthLayout />,
      children: [
        {
          path: "login",
          element: <LogIn />,
          action: LogInAction
        },
        {
          path: "signup",
          element: <SignUp />,
          action: SignUpFormAction
        }
      ]
    }
  ]
)



function App() {
  return (

      <AuthProvider>
          <RouterProvider router={router} />
      </AuthProvider>
  )
}

export default App
