import {Navigate, Outlet, useLocation} from "react-router-dom"
import useAuth from "../hooks/UseAuth.tsx";


function MainLayout() {

  const { accessToken } = useAuth()
  const currentLocation = useLocation()

  return (
    <>
      {
        accessToken ?
          <Outlet /> :
          <Navigate to="auto/login" state={{ from: currentLocation }} />
      }
    </>
  )
}

export default MainLayout