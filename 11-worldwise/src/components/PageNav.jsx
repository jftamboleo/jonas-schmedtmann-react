import { NavLink, Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import styles from './PageNav.module.css'

export function PageNav () {
  return (
    <nav className={styles.nav}>
      <Link to='/'>
        <Logo />
      </Link>
      <ul>
        <li><NavLink to='/product'>Product</NavLink></li>
        <li><NavLink to='/pricing'>Pricing</NavLink></li>
        <li><NavLink className={styles.ctaLink} to='/login'>Login</NavLink></li>
      </ul>
    </nav>
  )
}
