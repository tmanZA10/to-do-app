import styles from './Task.module.css'
import { completeTask, deleteTask } from "./Svgs.tsx";
import useAuth from "../../hooks/UseAuth.tsx";
import {backendURL} from "../../AppVariables.ts";
import useCurrentList from "../../hooks/UseCurrentList.tsx";
import {Dispatch, SetStateAction} from "react";

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

  const { accessToken, userId } = useAuth()
  const { listId } = useCurrentList()

  function taskAction(){
    if (task.completed){
      // console.log("delete clicked")
      fetch(
        `${backendURL}/api/task/delete/${userId}/${listId}/${task.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
        .then(res => res.json())
        .then(_ => {
          setTasks(t => {
            t.splice(index, 1)
            return [...t]
          })
        })
    }else {
      // console.log("complete clicked")
      fetch(
        `${backendURL}/api/task/complete/${userId}/${listId}/${task.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
        .then(res => res.json())
        .then(data => {
          const updatedTask:taskType = {
            id: data.id,
            task: data.task,
            priority: data.priority,
            dueDate: new Date(`${data.dueDate}T${data.dueTime}`),
            completed: data.completed
          }
          setTasks(t =>{
            t[index] = updatedTask
            return [...t]
          })
        })
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