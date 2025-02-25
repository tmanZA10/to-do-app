import styles from './MainPage.module.css'
import {useParams} from "react-router-dom";
import AddNewTask from "../../components/addnewtask/AddNewTask.tsx";
import TaskList from "../../components/tasklist/TaskList.tsx";

function MainPage() {
  console.log(useParams())
  return (
    <div className={styles.page}>
      {/*haha*/}
      <AddNewTask />
      <TaskList />
    </div>
  );
}

export default MainPage;