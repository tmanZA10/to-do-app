import styles from './LeftSideBar.module.css'
import { Link } from "react-router-dom";
import NavItem from "../navitem/NavItem.tsx";
import { useState } from "react";

type taskListType = {
  id: number;
  name: string;
}

function LeftSideBar() {

  const [taskList, setTaskList] = useState<taskListType[]>([])

  return (
    <nav className={styles.container}>
      <h1 className={styles.heading}>ToDoApp</h1>
      <div className={styles.myListsContainer}>
        <h3>My lists</h3>

        {
          taskList.length ? <ul>{
            taskList.map(
              (task =><li key={task.id}>
                <NavItem listName={task.name} />
              </li>)
            )
          }</ul> : <p>No TaskList</p>
        }

        <ul>
          {/*<li>*/}
          {/*  <NavItem listName={"work"} />*/}
          {/*</li>*/}
          {/*<li>*/}
          {/*  <NavItem listName={"personal"} />*/}
          {/*</li>*/}

          {/*<li>*/}
          {/*  <NavLink*/}
          {/*    to="/home"*/}
          {/*    className={classAllocator}*/}
          {/*  >Home</NavLink>*/}
          {/*</li>*/}
          {/*<li>*/}
          {/*  <NavLink to={"/Work"} className={classAllocator}>*/}
          {/*    Work*/}
          {/*  </NavLink>*/}
          {/*</li>*/}
        </ul>
        <Link to={"#"} className={styles.addNewList}>+New List</Link>
      </div>

    </nav>
  );
}

export default LeftSideBar;