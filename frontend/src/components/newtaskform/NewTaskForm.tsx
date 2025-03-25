import {Form} from "react-router-dom";
import styles from "./NewTaskForm.module.css";
import {ChangeEvent, Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import {backendURL} from "../../AppVariables.ts";
import useAuth from "../../hooks/UseAuth.tsx";
import useCurrentList from "../../hooks/UseCurrentList.tsx";
import {TasksContext} from "../tasklist/TaskList.tsx";
import {taskType} from "../task/Task.tsx";

type propTypes = {
  initialInput: string,
  setFormActive: Dispatch<SetStateAction<boolean>>,
  setAddTaskInput: Dispatch<SetStateAction<string>>,
}

function NewTaskForm({ initialInput, setFormActive, setAddTaskInput }: propTypes) {
  const now = new Date();

  const { accessToken, userId } = useAuth();
  const { listId } = useCurrentList()
  const { setTasks } = useContext(TasksContext)!

  const [taskInput, setTaskInput] = useState(initialInput)
  const [priority, setPriority] = useState("LOW")
  const [dueDate, setDueDate] = useState("")
  const [dueTime, setDueTime] = useState("")
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const isTask = taskInput.trim() !== ""
    const isDate = dueDate !== ""
    const isTime = dueTime !== ""
    if (isTask && isDate && isTime){
      setButtonDisabled(false)
    }
  }, [taskInput, dueDate, dueTime]);

  function handleTaskChange({ target }:ChangeEvent<HTMLInputElement>) {
    setTaskInput(target.value)
  }

  function handlePriorityChange({ target }:ChangeEvent<HTMLInputElement>){
    setPriority(target.value)
  }

  function handleDateChange({ target }:ChangeEvent<HTMLInputElement>) {
    setDueDate(target.value)
  }

  function handleTimeChange({ target }:ChangeEvent<HTMLInputElement>) {
    setDueTime(target.value)
  }

  async function handleSubmit(){
    const requestBody = {
      task: taskInput,
      taskListId: listId,
      userId,
      priority,
      dueDate,
      dueTime: `${dueTime}:00`,
    }

    const response = await fetch(
      `${backendURL}/api/task/new`,
      {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        }
      }
    )

    if (response.status === 409){
      setError("Task already exists")
      return
    }

    if (response.status > 199 && response.status < 300){
      const data = await response.json()
      const newTask: taskType = {
        id: data.id,
        task: data.task,
        priority: data.priority,
        dueDate: new Date(`${data.dueDate}T${data.dueTime}`),
        completed: data.completed
      }
      setTasks(t => [...t, newTask])
      setFormActive(false)
      setAddTaskInput("")
    }
  }

  return (
    <div className={styles.formContainer}>
      <Form>
        {
          error ? <p className={styles.errorMessage}>{error}</p> : null
        }
        <div className={styles.inputContainer}>
          <label htmlFor="task-input">Task</label>
          <input
            type="text"
            id="task-input"
            value={taskInput}
            onChange={handleTaskChange}
          />
        </div>
        <div className={styles.radioContainer}>
          <label className={styles.priority}>Priority:</label>
          <label className={styles.radioButton}>
            <input
              type="radio"
              value="LOW"
              checked={priority === "LOW"}
              onChange={handlePriorityChange}
            />
            LOW
          </label>
          <label className={styles.radioButton}>
            <input
              type="radio"
              value="MEDIUM"
              checked={priority === "MEDIUM"}
              onChange={handlePriorityChange}
            />
            MEDIUM
          </label>
          <label className={styles.radioButton}>
            <input
              type="radio"
              value="HIGH"
              checked={priority === "HIGH"}
              onChange={handlePriorityChange}
            />
            HIGH
          </label>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="date-input">Due Date</label>
          <input
            type="date"
            id="date-input"
            min={`${now.getFullYear()}-${zeroPadding(now.getMonth() + 1)}-${zeroPadding(now.getDate())}`}
            onChange={handleDateChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="time-input">Due Time</label>
          <input
            type="time"
            id="time-input"
            onChange={handleTimeChange}
          />
        </div>
        <button
          className={styles.submitButton}
          disabled={buttonDisabled}
          onClick={handleSubmit}
        >AddTask</button>
      </Form>
    </div>
  );
}

function zeroPadding(n: number) {
  if (n < 10) {
    return "0" + n;
  }
  return n+"";
}

export default NewTaskForm;