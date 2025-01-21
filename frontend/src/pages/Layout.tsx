import { NavLink, Outlet } from "react-router-dom"


function Layout() {
  return (
    <>
        <div>
            <h1>ToDo App</h1>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/tasks">My Tasks</NavLink>
                    </li>
                    <li>
                        <NavLink to="/addTask">Add Task</NavLink>
                    </li>
                    <li>
                        <NavLink to="/editTasks">Edit Tasks</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
        <Outlet />
    </>
  )
}

export default Layout