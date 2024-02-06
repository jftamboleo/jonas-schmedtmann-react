import styles from './CityList.module.css'
import Spinner from './Spinner.jsx'
import CityItem from './CityItem.jsx'
import Message from './Message.jsx'

export default function CityList ({ cities, isLoading }) {
  if (isLoading) return <Spinner />
  if (cities.length === 0) return <Message message='Add your first city by clicking on a city on the map' />
  return (
    <ul className={styles.citylist}>{cities.map(city => <CityItem key={city.id} {...city} />)}</ul>
  )
}
