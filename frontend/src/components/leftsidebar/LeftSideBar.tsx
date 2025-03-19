import styles from './LeftSideBar.module.css'
import NavItem from "../navitem/NavItem.tsx";
import {ChangeEvent, useEffect, useState} from "react";
import useAuth from '../../hooks/UseAuth.tsx'
import {backendURL} from "../../AppVariables.ts";

export type taskListType = {
  id: number;
  name: string;
}

function LeftSideBar() {

  const { accessToken, userId } = useAuth()

  const [taskList, setTaskList] = useState<taskListType[]>([])
  const [errorMessage, setErrorMessage] = useState("")
  const [newTaskInput, setNewTaskInput] = useState("")

  useEffect(() => {
    fetch(
      `${backendURL}/api/tasklist/all/${userId}`,
      {
        method: "GET",
        headers:{
          // contentType: "application/json",
          Authorization: `Bearer ${accessToken}`
        }
      }
    )
      .then(res => res.json())
      .then(data => {
        for (const item of data.taskLists){
          taskList.push({
            id: item.id,
            name: item.listName,
          })
        }
        setTaskList([...taskList])
      })
  },[])

  useEffect(() => {
    if (errorMessage !== ""){
      setErrorMessage("")
    }
  }, [newTaskInput]);

  function handleInput({ target }: ChangeEvent<HTMLInputElement>){
    setNewTaskInput(target.value)
  }

  function handleSubmit(){
    if (newTaskInput === ""){
      setErrorMessage("New task is empty.")
      return
    }
    if (newTaskInput.trim() === ""){
      setErrorMessage("New task is blank")
      return
    }

    for (const item of taskList){
      if (item.name === newTaskInput.trim()){
        setErrorMessage("List already exists.")
        return
      }
    }

    fetch(
      `${backendURL}/api/tasklist/new`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({userId, listName: newTaskInput})
      }
    )
      .then(res => res.json())
      .then(data => {
        const newList: taskListType[] = []
        for (const item of data.taskLists){
          newList.push({
            id: item.id,
            name: item.listName,
          })
        }
        setTaskList(newList)
        setNewTaskInput("")
      })
  }

  return (
    <nav className={styles.container}>
      <h1 className={styles.heading}>ToDoApp</h1>
      <div className={styles.myListsContainer}>
        <h3>My lists</h3>

        {
          taskList.length !== 0 && <ul>{
            taskList.map(
              (task =><li key={task.id}>
                <NavItem
                  listName={task.name}
                  navItemId={task.id}
                  setTaskList={setTaskList}
                />
              </li>)
            )
          }</ul>
        }
        <div>
          {errorMessage.length !==0 &&
              <p className={styles.newListErrorMessage}>{errorMessage}</p>}
          <div className={styles.newListContainer}>
            <input
              type="text"
              placeholder="New Task"
              value={newTaskInput}
              onChange={handleInput}
            />
            <button
              type="submit"
              onClick={handleSubmit}
            >
              Add
            </button>
          </div>
        </div>
      </div>

    </nav>
  );
}

export default LeftSideBar;