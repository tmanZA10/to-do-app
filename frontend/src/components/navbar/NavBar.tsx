import { NavLink, NavLinkRenderProps } from 'react-router-dom'
import styles from './NavBar.module.css'

type propTypes = {
    navList: {
        path: string,
        name: string
    }[]
}

export const handleActive = ( { isActive }: NavLinkRenderProps ) => isActive ? styles.active : styles.notActive

function NavBar({ navList }: propTypes) {
  return (
    <nav className={styles.navBar}>
        <h1>ToDo App</h1>
		<ul>
        {navList.map( 
		        (route, index) => 
                <li key={index}>
			        <NavLink className={handleActive} to={route.path}>
				        {route.name}
			        </NavLink>
		        </li>
	        )}
        </ul>
					{/* <img src={icon} className={styles.hamBurgerMenu} onClick={handleMenuClick} /> */}
    </nav>
  )
}

export default NavBar