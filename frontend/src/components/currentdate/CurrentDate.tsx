import styles from './CurrentDate.module.css'
import useCurrentDate from "../../hooks/UseCurrentDate.tsx";
import {useEffect, useState} from "react";

function CurrentDate() {
  const months =["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec" ];
  const { currentDate } = useCurrentDate()

  const [timeOfDay, setTimeOfDay] = useState<"Morning" | "Afternoon" | "Evening">("Morning")

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour>= 5 && hour < 12){
      setTimeOfDay("Morning")
    }else if (hour >= 12 && hour < 18){
      setTimeOfDay("Afternoon")
    }
    else{
      setTimeOfDay("Evening")
    }

  })

  return (
    <div className={styles.container}>
      <div >
        <div className={styles.month}>{months[currentDate.getMonth()]}</div>
        <div className={styles.day}>{currentDate.getDate()}</div>
      </div>
      <p className={styles.message}>Good {timeOfDay}</p>
    </div>
  );
}

export default CurrentDate;