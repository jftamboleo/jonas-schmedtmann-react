// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState, useEffect } from "react"
import { useCities } from "../contexts/CitiesContext"
import { useUrlPosition } from "../hooks/useUrlPosition"
import { useNavigate } from "react-router-dom"
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import Button from "./Button"
import ButtonBack from "./ButtonBack"
import Message from "./Message"
import Spinner from "./Spinner"
import styles from "./Form.module.css"

export function convertToEmoji (countryCode) {
  if (!countryCode) return
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt())
  return String.fromCodePoint(...codePoints)
}

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client'

function Form () {
  const [lat, lng] = useUrlPosition()
  const { addCity, isLoading } = useCities()
  const navigate = useNavigate()

  const [isLoadingPosition, setIsLoadingPosition] = useState(false)
  const [cityName, setCityName] = useState("")
  const [country, setCountry] = useState("")
  const [emoji, setEmoji] = useState(null)
  const [date, setDate] = useState(new Date())
  const [notes, setNotes] = useState("")
  const [geocodingError, setGeocodingError] = useState(null)

  useEffect(() => {
    if (!lat || !lng) return
    setIsLoadingPosition(true)
    setGeocodingError(null)
    const getCityFromPosition = async () => {
      try {
        const res = fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
        const data = await (await res).json()
        if (!data.countryCode) throw new Error('That doesn\'t seem to be a country. Try clicking somewhere else!')
        setCityName(data.city || data.locality || '')
        setCountry(data.countryName || '')
        setEmoji(data.countryCode || null)
      } catch (err) {
        setGeocodingError(err.message)
      } finally {
        setIsLoadingPosition(false)
      }
    }
    getCityFromPosition()
  }, [lat, lng])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!cityName || !date) return
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat,
        lng
      }
    }
    await addCity(newCity)
    navigate('/app/cities')
  }

  if (isLoadingPosition) return <Spinner />
  if (!lat || !lng) return <Message message={'Start by clicking somewhere on the map!'} />
  if (geocodingError) return <Message message={geocodingError} />

  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : ''}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id='date'
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat='dd/MM/YYYY'
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type='primary'>Add</Button>
        <ButtonBack />
      </div>
    </form>
  )
}

export default Form
