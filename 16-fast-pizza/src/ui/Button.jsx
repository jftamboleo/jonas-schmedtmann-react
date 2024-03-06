import { Link } from 'react-router-dom'

export default function Button ({ children, disabled, to, type, handleClick }) {
  const baseStyles = 'text-sm px-4 bg-yellow-400 uppercase font-semibold text-stone-800 inline-block tracking-wide rounded-full hover:bg-yellow-300 transition-colors focus:outline-none focus:ring focus:ring-yellow-300 focus-bg-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-stone-300'

  const styles = {
    primary: baseStyles + ' py-3 md:px-6 md:py-4',
    small: baseStyles + ' px-3 py-2 md:px-5 md:py-2.5 text-xs',
    round: baseStyles + ' py-2 px-2.5 md:px-3.5 md:py-2.5 text-base sm:text-xs',
    smallDelete: 'py-2 md:px-5 md:py-2.5 text-xs text-sm px-4 bg-stone-700 uppercase font-semibold text-stone-200 inline-block tracking-wide rounded-full hover:bg-stone-500 transition-colors focus:outline-none focus:ring focus:ring-stone-500 focus-bg-stone-500 focus:ring-offset-2 disabled:cursor-not-allowed',
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
