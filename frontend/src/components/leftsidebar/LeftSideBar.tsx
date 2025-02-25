import styles from './LeftSideBar.module.css'
import {Link, NavLink, NavLinkRenderProps} from "react-router-dom";

function LeftSideBar() {

  function classAllocator({ isActive }: NavLinkRenderProps){
    return isActive ? styles.activeList : styles.inactiveList
  }

  return (
    <nav className={styles.container}>
      <h1 className={styles.heading}>ToDoApp</h1>
      <div className={styles.myListsContainer}>
        <h3>My lists</h3>
        <ul>
          <li>
            <NavLink
              to="/home"
              className={classAllocator}
            >Home</NavLink>
          </li>
          <li>
            <NavLink to={"/Work"} className={classAllocator}>
              Work
            </NavLink>
          </li>
        </ul>
        <Link to={"#"} className={styles.addNewList}>+New List</Link>
      </div>

    </nav>
  );
}

export default LeftSideBar;