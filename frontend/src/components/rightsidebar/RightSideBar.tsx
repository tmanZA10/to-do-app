import styles from './RightSideBar.module.css'
import Calendar from "react-calendar";
import './Calendar.css'
import useCurrentDate from "../../hooks/UseCurrentDate.tsx";
import {backendURL} from "../../AppVariables.ts";
import {useNavigate} from "react-router-dom";
import useAuth from "../../hooks/UseAuth.tsx";

function RightSideBar() {

  const { currentDate, setCurrentDate } =useCurrentDate()!;
  const navigate = useNavigate();
  const { setAccessToken, setUserId } = useAuth()

  function logout(){
    fetch(`${backendURL}/auth/logout`, {
      method: "GET",
      credentials: "include",
    })
    navigate("../auth/login")
    setAccessToken("")
    setUserId("")
  }

  return (
    <div className={styles.container}>
      <div className={styles.calendarContainer}>
        <Calendar
          value={currentDate}
          onChange={(value) =>{
            setCurrentDate(value as Date);
          }}
        />
      </div>
      <div className={styles.signOutBtnContainer}>
        <button onClick={logout}>Log Out</button>
      </div>
    </div>
  );
}

export default RightSideBar;