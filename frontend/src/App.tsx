import { createBrowserRouter, RouterProvider } from "react-router-dom"
import MainLayout from "./layouts/MainLayout.tsx"
import NotFound from "./pages/notfound/NotFound.tsx";
import LogIn from "./pages/login/LogIn.tsx";
import SignUp from "./pages/signup/SignUp.tsx";
import AuthProvider from "./context/AuthContext.tsx";
import AuthLayout from "./layouts/AuthLayout.tsx";
import AutoLogin from "./pages/autologin/AutoLogin.tsx";
import MainPage from "./pages/mainpage/MainPage.tsx";
import CurrentListProvider from "./context/CurrentListContext.tsx";
import AuthAxiosProvider from "./context/AuthAxiosContext.tsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <NotFound />,
      children: [
        {
          path: "/:list",
          element: <MainPage />
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
        },
        {
          path: "signup",
          element: <SignUp />,
        }
      ]
    },
    {
      path: "auto/login",
      element: <AutoLogin />
    }
  ]
)

function App() {
  return (

      <AuthProvider>
        <AuthAxiosProvider>
          <CurrentListProvider>
            <RouterProvider router={router} />
          </CurrentListProvider>
        </AuthAxiosProvider>
      </AuthProvider>
  )
}

export default App
