import styles from './Task.module.css'
import { completeTask, deleteTask } from "./Svgs.tsx";
import useAuth from "../../hooks/UseAuth.tsx";
import useCurrentList from "../../hooks/UseCurrentList.tsx";
import {Dispatch, SetStateAction} from "react";
import useMainAxios from "../../hooks/UseMainAxios.tsx";

export type taskType ={
  id:number,
  task:string,
  priority: "LOW" | "MEDIUM" | "HIGH",
  dueDate: Date,
  completed: boolean,
}

type propTypes = {
  task: taskType,
  index: number,
  setTasks: Dispatch<SetStateAction<taskType[]>>
}

function formatTime(date: Date): string {
  let hours = ""
  let minutes = ""
  if(date.getHours() < 10){
    hours = "0" + date.getHours()
  }
  else {
    hours += date.getHours()
  }
  if(date.getMinutes() < 10){
    minutes = "0" + date.getMinutes()
  }
  else {
    minutes += date.getMinutes()
  }
  return `${hours}:${minutes}`
}

function Task({ task, index, setTasks }: propTypes) {

  const mainAxios = useMainAxios()

  const { userId } = useAuth()
  const { listId } = useCurrentList()

  async function taskAction(){
    if (task.completed){
      const response = await mainAxios.delete(
        `/task/delete/${userId}/${listId}/${task.id}`
      )
      if (response.status === 200){
        setTasks(t =>{
          t.splice(index, 1)
          return [...t]
        })
      }
    }else {
      const response = await mainAxios.patch(
        `/task/complete/${userId}/${listId}/${task.id}`
      )
      if (response.status === 200){
        setTasks(
          t => {
            t[index].completed = response.data.completed
            return [...t]
          }
        )
      }
    }
  }
  return (
    <li className={styles.container}>
      <div onClick={taskAction}>
        {
          task.completed ? deleteTask : completeTask
        }
      </div>
      <div className={styles.details}>
        <div className={styles.time}>{formatTime(task.dueDate)}</div>
        <div className={styles.task}>{task.task}</div>
      </div>
      <div className={styles.priority}>
        {task.priority}
      </div>

    </li>
  );
}
export default Task;