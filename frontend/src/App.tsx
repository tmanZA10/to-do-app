import { createBrowserRouter, RouterProvider } from "react-router-dom"
import LogIn from "./pages/LogIn"
import NotFound from "./pages/NotFound"
import Layout from "./pages/Layout"
import Home from "./pages/Home"
import ViewTasks from "./pages/ViewTasks"
import AddTask from "./pages/AddTask"
import EditTasks from "./pages/EditTasks"
// import { signUpAction } from "./components/signupform/SignUpForm"
// import SignUp from "./pages/SignUp"

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
    // {
    //   path: "/signup",
    //   element: <SignUp />,
    //   action: signUpAction
    // },
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
