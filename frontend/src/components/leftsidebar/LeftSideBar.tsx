import styles from './LeftSideBar.module.css'
import { useEffect, useState } from "react";
import useAuth from '../../hooks/UseAuth.tsx'
import useMainAxios from "../../hooks/UseMainAxios.tsx";
import ListNavItem from "../listnavitem/ListNavItem.tsx";
import NewList from "../newlist/NewList.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import useCurrentList from "../../hooks/UseCurrentList.tsx";

export type taskListType = {
  id: number;
  name: string;
}

function LeftSideBar() {

  const { userId } = useAuth()
  const mainAxios = useMainAxios()
  const location = useLocation()
  const navigate = useNavigate()
  const { setListName, setListId } = useCurrentList()

  const [taskList, setTaskList] = useState<taskListType[]>([])

  useEffect(() => {
    async function getData(){
      const response = await mainAxios.get(
        `/tasklist/all/${userId}`
      )
      let validUrl = false
      for (const item of response.data.taskLists){
        if (`/${location.pathname}` === item.listName){
          validUrl = true
        }
        taskList.push(
          {
            id: item.id,
            name: item.listName
          }
        )
      }
      setTaskList([...taskList])
      if (!validUrl && taskList.length > 0){
        setListName(taskList[0].name)
        setListId(taskList[0].id)
        navigate(`/${taskList[0].name}`)
      }else {
        navigate("/")
      }
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