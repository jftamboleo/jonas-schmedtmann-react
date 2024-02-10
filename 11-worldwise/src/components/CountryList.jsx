import styles from './CountryList.module.css'
import Spinner from './Spinner.jsx'
import CountryItem from './CountryItem.jsx'
import Message from './Message.jsx'
import { useCities } from '../contexts/CitiesContext.jsx'

export default function CountryList () {
  const { cities, isLoading } = useCities()

  if (isLoading) return <Spinner />
  if (cities.length === 0) return <Message message='Add your first city by clicking on a city on the map' />

  const countries = cities.reduce((accumulator, curr) => {
    if (!accumulator.map(item => item.country).includes(curr.country)) {
      accumulator.push({ country: curr.country, emoji: curr.emoji })
    }
    return accumulator
  }, [])
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.country} country={country} />
      ))}
    </ul>
  )
}
