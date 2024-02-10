import styles from './CityItem.module.css'
import { Link } from 'react-router-dom'
import { useCities } from '../contexts/CitiesContext'

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(date))

export default function CityItem ({ cityName, emoji, date, id, position }) {
  const { currentCity, deleteCity } = useCities()

  const handleClick = (e) => {
    e.preventDefault()
    deleteCity(id)
  }

  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${currentCity.id === id ? styles['cityItem--active'] : ''}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button
          className={styles.deleteBtn}
          onClick={handleClick}
        >
          &times;
        </button>
      </Link>
    </li>
  )
}
