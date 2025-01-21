import { Route, Routes } from "react-router-dom"
import LogIn from "./pages/LogIn"
import NotFound from "./pages/NotFound"
import Layout from "./pages/Layout"
import Home from "./pages/Home"
import ViewTasks from "./pages/ViewTasks"
import AddTask from "./pages/AddTask"
import EditTasks from "./pages/EditTasks"



function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="tasks" element={<ViewTasks />} />
        <Route path="addTask" element={<AddTask />} />
        <Route path="editTasks" element={<EditTasks />} />
      </Route>
      <Route path="/login" element={<LogIn />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
