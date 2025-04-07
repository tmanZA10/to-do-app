import styles from './LeftSideBar.module.css'
import { useEffect, useState } from "react";
import useAuth from '../../hooks/UseAuth.tsx'
import useMainAxios from "../../hooks/UseMainAxios.tsx";
import ListNavItem from "../listnavitem/ListNavItem.tsx";
import NewList from "../newlist/NewList.tsx";

export type taskListType = {
  id: number;
  name: string;
}

function LeftSideBar() {

  const { userId } = useAuth()
  const mainAxios = useMainAxios()

  const [taskList, setTaskList] = useState<taskListType[]>([])

  useEffect(() => {
    async function getData(){
      const response = await mainAxios.get(
        `/tasklist/all/${userId}`
      )
      for (const item of response.data.taskLists){
        taskList.push(
          {
            id: item.id,
            name: item.listName
          }
        )
      }
      setTaskList([...taskList])
    }
    getData()
  },[])

  return (
    <nav className={styles.container}>
      <h1 className={styles.heading}>ToDoApp</h1>
      <div className={styles.myListsContainer}>
        {
          taskList.length !== 0 &&
            <>
                <h3>My lists</h3>
                <ul>
                  {
                    taskList.map(
                      task => <li key={task.id}>
                        <ListNavItem
                          listName={task.name}
                          navItemId={task.id}
                          setTaskList={setTaskList}
                        />
                      </li>
                    )
                  }
                </ul>
            </>
        }
        <NewList
          taskList={taskList}
          setTaskList={setTaskList}
        />
      </div>

    </nav>
  );
}

export default LeftSideBar;