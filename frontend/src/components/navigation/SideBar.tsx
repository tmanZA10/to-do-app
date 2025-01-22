import { useState } from 'react'
import styles from './SideBar.module.css'
import hamburger from '../../assets/hamburger_menu.svg'
import close from '../../assets/close.svg'
import { NavLink } from 'react-router-dom'
import { handleActive } from './NavBar'

type propTypes = {
    navList: {
        path: string,
        name: string
    }[]
}


function SideBar({ navList }: propTypes) {
    const [icon, setIcon] = useState(hamburger)
	const [sideBarOpen, setSideBarOpen] = useState(false)

    function handleMenuClick(){
		if(sideBarOpen){
			setIcon(hamburger)
		}else{
			setIcon(close)
		}
		setSideBarOpen(s => !s)
	}

    function handleSideClose(){
		if (sideBarOpen){
			return styles.sideBar
		}
		return `${styles.sideBar} ${styles.sideBarClose}`
	}

    return (
        <>
            <img src={icon} className={styles.hamBurgerMenu} onClick={handleMenuClick} />
            <nav className={handleSideClose()}>
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
			</nav>
        </>
    )
}

export default SideBar