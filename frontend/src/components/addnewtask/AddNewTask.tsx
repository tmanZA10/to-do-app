import styles from './AddNewTask.module.css'
import {ChangeEvent, useState} from "react";
import NewTaskForm from "../newtaskform/NewTaskForm.tsx";
import {Form} from "react-router-dom";


function AddNewTask() {

  const [addTaskInput, setAddTaskInput] = useState("")
  const [formActive, setFormActive] = useState(false)

  function handleInputChange({ target }:ChangeEvent<HTMLInputElement> ){
    setAddTaskInput(target.value)
  }

  function handleSubmit() {
    setFormActive(true)
  }

  return (
    <>
      {formActive ?
        <NewTaskForm
          initialInput={addTaskInput}
          setFormActive={setFormActive}
          setAddTaskInput={setAddTaskInput}
        /> :
        <Form className={styles.container}>
          <input
            type="text"
            placeholder="Add a task..."
            className={styles.add}
            value={addTaskInput}
            onChange={handleInputChange}
          />
          <button
            className={styles.addButton}
            onClick={handleSubmit}
          >Add
          </button>
        </Form>
      }
    </>
  );
}

export default AddNewTask;