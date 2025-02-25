import styles from './AddNewTask.module.css'


function AddNewTask() {
  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Add a task..."
        className={styles.add}
      />
      <button className={styles.addButton}>Add</button>
    </div>
  );
}

export default AddNewTask;