import styles from './NewList.module.css'
import {Form, useNavigate} from "react-router-dom";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {taskListType} from "../leftsidebar/LeftSideBar.tsx";
import useMainAxios from "../../hooks/UseMainAxios.tsx";
import useAuth from "../../hooks/UseAuth.tsx";
import useCurrentList from "../../hooks/UseCurrentList.tsx";

type propsType = {
  taskList: taskListType[]
  setTaskList: Dispatch<SetStateAction<taskListType[]>>
}

function NewList({ taskList, setTaskList }: propsType) {

  const mainAxios = useMainAxios()
  const { userId } = useAuth()
  const { setListName, setListId } = useCurrentList()
  const navigate = useNavigate()

  const [input, setInput] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    if (error !== ""){
      setError("")
    }
  }, [input]);

  async function handleSubmit(){
    if (input === ""){
      setError("New task is empty.")
      return
    }
    if (input.trim() === ""){
      setError("New task is blank")
      return
    }

    for (const item of taskList){
      if (item.name === input.trim()){
        setError("List already exists.")
        return
      }
    }
    const response = await mainAxios.post(
      "/tasklist/new",
      { userId, listName: input },
    )
    const newList: taskListType[] = []
    let newListId = -1;
    for (const item of response.data.taskLists){
      if (item.name === input.trim()){
        newListId = item.id
      }
      newList.push(
        {
          id: item.id,
          name: item.listName
        }
      )
    }
    setTaskList(newList)
    setListId(newListId)
    setListName(input.trim())
    navigate(`/${input.trim()}`)
    setInput("")
  }

  return (
    <div>
      {error.length !== 0 &&
          <p className={styles.newListErrorMessage}>{error}</p>
      }
      <Form
        className={styles.newListForm}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="New List"
          value={input}
          onChange= { ({ target }) => setInput(target.value) }
        />
        <button
          type="submit"
        >
          Add
        </button>
      </Form>
    </div>
  );
}

export default NewList;