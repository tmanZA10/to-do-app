import styles from './Task.module.css'

export type taskType ={
  id:number,
  task:string,
  priority: "LOW" | "MEDIUM" | "HIGH",
  dueDate: Date,
  completed: boolean,
}

type propTypes = {
  task:taskType
}

function formatTime(date: Date): string {
  let hours = ""
  let minutes = ""
  if(date.getHours() < 10){
    hours = "0" + date.getHours()
  }
  else {
    hours += date.getHours()
  }
  if(date.getMinutes() < 10){
    minutes = "0" + date.getMinutes()
  }
  else {
    minutes += date.getMinutes()
  }
  return `${hours}:${minutes}`
}

function Task({ task }: propTypes) {
  console.log(task)
  return (
    <li className={styles.container}>
      <div>
        <input
          type="checkbox"
          // checked={task.completed}
          name=""
          id=""
        />
      </div>
      <div className={styles.details}>
        <div className={styles.time}>{formatTime(task.dueDate)}</div>
        <div className={styles.task}>{task.task}</div>
      </div>
      <div className={styles.priority}>
        {task.priority}
      </div>

    </li>
  );
}
export default Task;