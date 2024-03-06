import { Link } from 'react-router-dom'

export default function Button ({ children, disabled, to, type, handleClick }) {
  const baseStyles = 'text-sm px-4 bg-yellow-400 uppercase font-semibold text-stone-800 inline-block tracking-wide rounded-full hover:bg-yellow-300 transition-colors focus:outline-none focus:ring focus:ring-yellow-300 focus-bg-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed'

  const styles = {
    primary: baseStyles + ' py-3 md:px-6 md:py-4',
    small: baseStyles + ' py-2 md:px-5 md:py-2.5 text-xs',
    smallRed: 'py-2 md:px-5 md:py-2.5 text-xs text-sm px-4 bg-red-400 uppercase font-semibold text-stone-800 inline-block tracking-wide rounded-full hover:bg-red-300 transition-colors focus:outline-none focus:ring focus:ring-red-300 focus-bg-red-300 focus:ring-offset-2 disabled:cursor-not-allowed',
    secondary: 'text-sm px-4 rounded-full border-2 uppercase font-semibold text-stone-600 inline-block tracking-wide rounded-full hover:bg-stone-200 hover:text-stone-800 transition-colors focus:outline-none focus:ring focus:outline-none focus:ring-stone-300 focus-bg-stone-300 focus:ring-offset-2 disabled:cursor-not-allowed py-2.5 md:px-6 md:py-4'
  }

  if (to) {
    return (
      <Link
        to={to}
        className={styles[type]}
      >
        {children}
      </Link>
    )
  }

  if (handleClick) {
    return (
      <button
        disabled={disabled}
        className={styles[type]}
        onClick={handleClick}
      >
        {children}
      </button>
    )
  }

  return (
    <button
      disabled={disabled}
      className={styles[type]}
    >
      {children}
    </button>
  )
}
