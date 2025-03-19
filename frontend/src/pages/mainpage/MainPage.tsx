import styles from './MainPage.module.css'
import AddNewTask from "../../components/addnewtask/AddNewTask.tsx";
import TaskList from "../../components/tasklist/TaskList.tsx";

function MainPage() {
  return (
    <div className={styles.page}>
      <AddNewTask />
      <TaskList />
    </div>
  );
}

export default MainPage;