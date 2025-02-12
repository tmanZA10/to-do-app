import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./layouts/Layout"
import { SignUpFormAction } from "./components/signupform/SignUpForm"
import {LogInAction} from "./components/loginform/LoginForm.tsx";
import NotFound from "./pages/notfound/NotFound.tsx";
import Home from "./pages/Home.tsx";
import LogIn from "./pages/login/LogIn.tsx";
import SignUp from "./pages/signup/SignUp.tsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        {
          path: "",
          element: <Home />
        },
        {
          path: "/login",
          element: <LogIn />,
          action: LogInAction
        },
        {
          path: "/signup",
          element: <SignUp />,
          action: SignUpFormAction
        },
      ]
    },
  ]
)



function App() {
  return (
    // <Routes>
    //   <Route path="/" element={<Layout />}>
    //     <Route index element={<Home />} />
    //     <Route path="tasks" element={<ViewTasks />} />
    //     <Route path="addTask" element={<AddTask />} />
    //     <Route path="editTasks" element={<EditTasks />} />
    //   </Route>
    //   <Route path="/login" element={<LogIn />} />
    //   <Route path="*" element={<NotFound />} />
    // </Routes>

    <RouterProvider router={router} />
  )
}

export default App
