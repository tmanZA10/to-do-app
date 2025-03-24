import Task from "../task/Task.tsx";
import styles from "./TaskList.module.css";
import useCurrentList from "../../hooks/UseCurrentList.tsx";
import {useEffect, useState} from "react";
import {backendURL} from "../../AppVariables.ts";
import useAuth from "../../hooks/UseAuth.tsx";
import {taskType} from "../task/Task.tsx";
import AddNewTask from "../addnewtask/AddNewTask.tsx";

function TaskList() {

  const { listId } = useCurrentList()
  const { userId, accessToken } = useAuth()

  const [tasks, setTasks] = useState<taskType[]>([])

  useEffect(()=>{
    if (listId !== -1){
      fetch(
        `${backendURL}/api/task/all/${userId}/${listId}`,
        {
          method: "GET",
          headers:{
            authorization: `Bearer ${accessToken}`
          }
        }
      ).then(res => res.json())
        .then(data =>{
          const newTasks: taskType[] = []
          for (const item of data.tasks){
            newTasks.push({
              id: item.id,
              task: item.task,
              priority: item.priority,
              dueDate: new Date(`${item.dueDate}T${item.dueTime}`),
              completed: item.completed
            })
          }
          setTasks(newTasks)
        })
    }
  }, [listId])

  return (
    <>
      <AddNewTask />
      <div>
        <div className={styles.header}>
          <h4>Tasks</h4>
          <select name="sort" id="">
            <option value="sort">Sort</option>
            <option value="time">Time</option>
            <option value="priority">Priority</option>
          </select>
        </div>
        <>
          {
            tasks.length ?
              <ul className={styles.list}>
                {
                  tasks.map(
                    ((task, i) =>
                        <Task
                          key={task.id}
                          task={task}
                          index={i}
                          setTasks={setTasks}
                        />
                    )
                  )
                }
              </ul> :
              <p>No tasks found.</p>
          }
        </>
      </div>
    </>
  );
}

export default TaskList;