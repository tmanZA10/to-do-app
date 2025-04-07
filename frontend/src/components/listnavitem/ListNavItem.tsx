import styles from './ListNavItem.module.css'
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import useCurrentList from "../../hooks/UseCurrentList.tsx";
import useAuth from "../../hooks/UseAuth.tsx";
import {taskListType} from "../leftsidebar/LeftSideBar.tsx";
import useMainAxios from "../../hooks/UseMainAxios.tsx";

type propTypes = {
  listName: string;
  navItemId: number;
  setTaskList: (taskList: taskListType[]) => void;
}

function NavItem({ listName, navItemId, setTaskList }:propTypes) {

  const params = useParams()
  const {listId, setListId, setListName} = useCurrentList()
  const { userId } = useAuth()
  const mainAxios = useMainAxios()
  const navigate = useNavigate();

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

  async function handleDelete(){
    const response = await mainAxios.delete(
      `/tasklist/delete/${userId}/${navItemId}`
    )
    const newTaskList: taskListType[] = []
    for (const item of response.data.taskLists){
      newTaskList.push(
        {
          id: item.id,
          name: item.listName
        }
      )
    }
    setTaskList(newTaskList)
    if (newTaskList.length > 0){
      setListName(newTaskList[0].name)
      setListId(newTaskList[0].id)
      navigate(`/${newTaskList[0].name}`)
    }
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