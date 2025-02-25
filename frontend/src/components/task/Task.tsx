import styles from './Task.module.css'

function Task() {
  return (
    <li className={styles.container}>
      <div>
        <input type="checkbox" name="" id=""/>
      </div>
      <div className={styles.details}>
        <div className={styles.time}>18:00</div>
        <div className={styles.task}>Wash Car</div>
      </div>
      <div className={styles.priority}>
        High
      </div>

    </li>
  );
}

export default Task;