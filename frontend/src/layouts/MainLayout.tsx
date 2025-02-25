import {Navigate, Outlet, useLocation} from "react-router-dom"
import useAuth from "../hooks/UseAuth.tsx";
import LeftSideBar from "../components/leftsidebar/LeftSideBar.tsx";
import RightSideBar from "../components/rightsidebar/RightSideBar.tsx";
import CurrentDate from "../components/currentdate/CurrentDate.tsx";
import styles from './MainLayout.module.css'
import CurrentDateProvider from "../context/CurrentDateContext.tsx";


function MainLayout() {

  const { accessToken } = useAuth()
  const currentLocation = useLocation()

  return (
    <>
      {
        accessToken ?
          <CurrentDateProvider>
            <div className={styles.layout}>
              <LeftSideBar/>
              <CurrentDate/>
              <RightSideBar/>
              <Outlet/>
            </div>
          </CurrentDateProvider> :
          <Navigate to="auto/login" state={{from: currentLocation}}/>
      }
    </>
  )
}

export default MainLayout