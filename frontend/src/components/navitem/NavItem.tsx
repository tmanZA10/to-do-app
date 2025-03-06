import styles from './NavItem.module.css'
import {useState} from "react";
import {NavLink, NavLinkRenderProps} from "react-router-dom";

type propTypes = {
  listName: string
}

function NavItem({ listName }:propTypes) {

  const [active, setActive] = useState(false)


  function handleActiveChange({ isActive }: NavLinkRenderProps) {
    setActive(isActive)

    return undefined
  }

  function classAllocator(){
    return active ? `${styles.container} ${styles.active}` :
      `${styles.container} ${styles.inactive}`
  }

  return (
    <div className={classAllocator()}>
      <NavLink
        to={`/${listName}`}
        className={handleActiveChange}
      >
        {listName}
      </NavLink>
      <button>x</button>
    </div>
  );
}

export default NavItem;