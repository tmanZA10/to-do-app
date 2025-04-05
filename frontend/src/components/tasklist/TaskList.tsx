import Task from "../task/Task.tsx";
import styles from "./TaskList.module.css";
import useCurrentList from "../../hooks/UseCurrentList.tsx";
import {createContext, Dispatch, SetStateAction, useEffect, useState} from "react";
import useAuth from "../../hooks/UseAuth.tsx";
import {taskType} from "../task/Task.tsx";
import AddNewTask from "../addnewtask/AddNewTask.tsx";
import useMainAxios from "../../hooks/UseMainAxios.tsx";
import useCurrentDate from "../../hooks/UseCurrentDate.tsx";
import {setMinTime} from "../../util.tsx";

type tasksContextType = {
  tasks: taskType[],
  setTasks: Dispatch<SetStateAction<taskType[]>>
}

export const TasksContext = createContext<tasksContextType | undefined>(undefined)

function TaskList() {

  const mainAxios = useMainAxios()

  const { listId } = useCurrentList()
  const { userId } = useAuth()
  const { currentDate } = useCurrentDate()

  const [tasks, setTasks] = useState<taskType[]>([])

  useEffect(()=>{
    async function getData(){
      const response = await mainAxios.get(
        `/task/all/${userId}/${listId}`
      )
      const newTasks: taskType[] = []
      for (const item of response.data.tasks){
        newTasks.push({
          id: item.id,
          task: item.task,
          priority: item.priority,
          dueDate: new Date(`${item.dueDate}T${item.dueTime}`),
          completed: item.completed
        })
          }
          setTasks(newTasks)
    }
    if (listId !== -1){
      getData()
    }
  }, [listId])

  return (
    <>
      <TasksContext.Provider value={{tasks, setTasks}}>
        <AddNewTask />
      </TasksContext.Provider>
      <div>
        <div className={styles.header}>
          <h4>Tasks</h4>
          {/*<select name="sort" id="">*/}
          {/*  <option value="sort">Sort</option>*/}
          {/*  <option value="time">Time</option>*/}
          {/*  <option value="priority">Priority</option>*/}
          {/*</select>*/}
        </div>
        <>
          {
            tasks.length ?
              <ul className={styles.list}>
                {
                  tasks.map(
                    ((task, i) =>
                      task.dueDate >= setMinTime(currentDate) &&
                      task.dueDate < currentDate ?
                        <Task
                          key={task.id}
                          task={task}
                          index={i}
                          setTasks={setTasks}
                        /> :null
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