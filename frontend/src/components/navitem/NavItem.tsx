import styles from './NavItem.module.css'
import { Link, useParams} from "react-router-dom";
import {useEffect} from "react";
import useCurrentList from "../../hooks/UseCurrentList.tsx";
import useAuth from "../../hooks/UseAuth.tsx";
import {backendURL} from "../../AppVariables.ts";
import {taskListType} from "../leftsidebar/LeftSideBar.tsx";

type propTypes = {
  listName: string;
  navItemId: number;
  setTaskList: (taskList: taskListType[]) => void;
}

function NavItem({ listName, navItemId, setTaskList }:propTypes) {

  const params = useParams()
  const {listId, setListId} = useCurrentList()
  const { userId, accessToken } = useAuth()

  useEffect(() => {
    if (params.list === listName){
      setListId(navItemId)
    }
  },[])

  function classAllocator(){

    return listId === navItemId || params.list === listName
      ? `${styles.container} ${styles.active}`
      : `${styles.container} ${styles.inactive}`
  }

  function handleClick(){
    setListId(navItemId)
  }

  function handleDelete(){
    fetch(
      `${backendURL}/api/tasklist/delete/${userId}/${navItemId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    ).then(res => res.json())
      .then(data =>{
        const newTaskList:taskListType[] = []
        for (const item of data.taskLists){
          newTaskList.push(
            {
              id: item.id,
              name: item.listName
            }
          )
        }
        setTaskList(newTaskList)
      })
  }

  return (
    <div className={classAllocator()}>
      <div onClick={handleClick}>
        <Link
          to={`/${listName}`}
        >
          {listName}
        </Link>
      </div>
      <button onClick={handleDelete}>x</button>
    </div>
  );
}

export default NavItem;