import styles from './NavItem.module.css'
import { Link, useParams } from "react-router-dom";
import {useEffect} from "react";
import useCurrentList from "../../hooks/UseCurrentList.tsx";

type propTypes = {
  listName: string;
  navItemId: number;
}

function NavItem({ listName, navItemId }:propTypes) {

  const params = useParams()
  const {listId, setListId} = useCurrentList()

  useEffect(() => {
    if (params.list === listName){
      setListId(navItemId)
    }
  },[])

  function classAllocator(){

    return listId === navItemId || params.list === listName
      ? `${styles.container} ${styles.active}`
      : `${styles.container} ${styles.inactive}`
  }

  function handleClick(){
    setListId(navItemId)
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