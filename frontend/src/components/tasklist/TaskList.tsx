import Task from "../task/Task.tsx";
import styles from "./TaskList.module.css";


function TaskList() {
  return (
    <div>
      <div className={styles.header}>
        <h4>Tasks</h4>
        <select name="sort" id="">
          <option value="sort">Sort</option>
          <option value="time">Time</option>
          <option value="priority">Priority</option>
        </select>
      </div>
      <ul className={styles.list}>
        <Task/>
        <Task/>
      </ul>
    </div>
  );
}

export default TaskList;