import styles from './Button.module.css'

export default function Button ({ children, type, handleClick }) {
  return (
    <button
      onClick={handleClick}
      className={`${styles.btn} ${styles[type]}`}
    >
      {children}
    </button>
  )
}
