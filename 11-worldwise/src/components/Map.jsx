import { useSearchParams, useNavigate } from 'react-router-dom'
import styles from './Map.module.css'

export default function Map () {
  const [searchParams, setSearchParams] = useSearchParams()
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')
  const navigate = useNavigate()
  return (
    <div
      className={styles.mapContainer}
      onClick={() => navigate('form')}
    >
      <h1>Map</h1>
      <br />
      {lat && lng &&
        <>
          <h2>Lat: {lat}</h2>
          <h2>Lng: {lng}</h2>
          <button
            onClick={() => {
              setSearchParams({ lat: '50', lng: '23' })
            }}
          >
            Change pos</button>
        </>
      }
    </div>
  )
}
