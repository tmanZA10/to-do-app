import styles from './RightSideBar.module.css'
import Calendar from "react-calendar";
import './Calendar.css'
import useCurrentDate from "../../hooks/UseCurrentDate.tsx";
import {useNavigate} from "react-router-dom";
import useAuth from "../../hooks/UseAuth.tsx";
import useAuthAxios from "../../hooks/UseAuthAxios.tsx";

function RightSideBar() {

  const authAxios = useAuthAxios()

  const { currentDate, setCurrentDate } =useCurrentDate()!;
  const navigate = useNavigate();
  const { setAccessToken, setUserId } = useAuth()

  async function logout(){
    await authAxios.get(
      "/logout",
      {
        withCredentials: true
      }
    )
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