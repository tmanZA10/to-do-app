import { createBrowserRouter, RouterProvider } from "react-router-dom"
import LogIn from "./pages/login/LogIn"
import NotFound from "./pages/notfound/NotFound"
import Layout from "./layouts/Layout"
import Home from "./pages/Home"
import ViewTasks from "./pages/ViewTasks"
import AddTask from "./pages/AddTask"
import EditTasks from "./pages/EditTasks"
import SignUp from "./pages/signup/SignUp"
import { SignUpFormAction } from "./components/signupform/SignUpForm"

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
          path: "tasks",
          element: <ViewTasks />
        },
        {
          path: "addTask",
          element: <AddTask />
        },
        {
          path: "editTasks",
          element: <EditTasks />
        },
      ]
    },
    {
      path: "/login",
      element: <LogIn />
    },
    {
      path: "/signup",
      element: <SignUp />,
      action: SignUpFormAction
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
