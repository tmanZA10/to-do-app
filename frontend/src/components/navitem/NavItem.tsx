import styles from './NavItem.module.css'
import { Link, useParams } from "react-router-dom";
import {useEffect} from "react";

type propTypes = {
  listName: string;
  navItemId: number;
  activeId: number | null;
  setActiveId: (id: number) => void;
}

function NavItem({ listName, navItemId, setActiveId, activeId }:propTypes) {

  const params = useParams()

  useEffect(() => {
    if (params.list === listName){
      setActiveId(navItemId)
    }
  },[])

  function classAllocator(){

    return activeId === navItemId || params.list === listName
      ? `${styles.container} ${styles.active}`
      : `${styles.container} ${styles.inactive}`
  }

  function handleClick(){
    setActiveId(navItemId)
  }

  return (
    <div className={classAllocator()}>
      <div onClick={handleClick}>
        <Link
          to={`/${listName}`}
        >
          {listName}
        </Link>
      </div>
      <button>x</button>
    </div>
  );
}

export default NavItem;