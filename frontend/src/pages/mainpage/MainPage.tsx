import styles from './MainPage.module.css'
import TaskList from "../../components/tasklist/TaskList.tsx";

function MainPage() {
  return (
    <div className={styles.page}>
      <TaskList />
    </div>
  );
}

export default MainPage;