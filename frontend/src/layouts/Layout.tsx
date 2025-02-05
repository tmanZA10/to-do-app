import { Outlet } from "react-router-dom"
import NavBar from "../components/navigation/NavBar"
import SideBar from "../components/navigation/SideBar"


function Layout() {

	const routes = [
		{
			path: "/tasks",
			name: "My Tasks"
		},
		{
			path: "/addTask",
			name: "Add Task"
		},
		{
			path: "/editTasks",
			name: "Edit Tasks"
		}
	]

  return (
    <>
				<NavBar navList={routes} />
				<SideBar navList={routes} />
        <Outlet />
    </>
  )
}

export default Layout