import styles from './RightSideBar.module.css'
import Calendar from "react-calendar";
import './Calendar.css'
import useCurrentDate from "../../hooks/UseCurrentDate.tsx";

function RightSideBar() {

  const { currentDate, setCurrentDate } =useCurrentDate()!;

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
        <button>Sign Out</button>
      </div>
    </div>
  );
}

export default RightSideBar;