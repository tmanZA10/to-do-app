import styles from './LeftSideBar.module.css'
import NavItem from "../navitem/NavItem.tsx";
import { ChangeEvent, useEffect, useState } from "react";
import useAuth from '../../hooks/UseAuth.tsx'
import { Form } from "react-router-dom";
import useMainAxios from "../../hooks/UseMainAxios.tsx";

export type taskListType = {
  id: number;
  name: string;
}

function LeftSideBar() {

  const { userId } = useAuth()
  const mainAxios = useMainAxios()

  const [taskList, setTaskList] = useState<taskListType[]>([])
  const [errorMessage, setErrorMessage] = useState("")
  const [newTaskInput, setNewTaskInput] = useState("")

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

  useEffect(() => {
    if (errorMessage !== ""){
      setErrorMessage("")
    }
  }, [newTaskInput]);

  function handleInput({ target }: ChangeEvent<HTMLInputElement>){
    setNewTaskInput(target.value)
  }

  async function handleSubmit(){
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

    const response = await mainAxios.post(
      "/tasklist/new",
      { userId, listName: newTaskInput },
    )
    const newList: taskListType[] = []
    for (const item of response.data.taskLists){
      newList.push(
        {
          id: item.id,
          name: item.listName
        }
      )
    }
    setTaskList(newList)
    setNewTaskInput("")
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
          <Form
            className={styles.newListForm}
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="New Task"
              value={newTaskInput}
              onChange={handleInput}
            />
            <button
              type="submit"
            >
              Add
            </button>
          </Form>
        </div>
      </div>

    </nav>
  );
}

export default LeftSideBar;