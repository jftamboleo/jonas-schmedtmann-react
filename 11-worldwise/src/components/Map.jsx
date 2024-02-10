import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useGeolocation } from '../hooks/useGeolocation'
import { useUrlPosition } from '../hooks/useUrlPosition'
import { useCities } from '../contexts/CitiesContext'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import Button from './Button'
import styles from './Map.module.css'

export default function Map () {
  const [mapPosition, setMapPosition] = useState([50, 2])
  const { cities } = useCities()
  const {
    position: geoLocationPosition,
    isLoading: isLoadingPosition,
    getPosition
  } = useGeolocation()

  const [mapLat, mapLng] = useUrlPosition()

  useEffect(() => {
    if (mapLat === null || mapLng === null) return
    setMapPosition([mapLat, mapLng])
  }, [mapLat, mapLng])

  useEffect(() => {
    if (!geoLocationPosition) return
    setMapPosition(geoLocationPosition)
  }, [geoLocationPosition])

  return (
    <div className={styles.mapContainer}>
      {mapPosition !== geoLocationPosition && <Button type='position' handleClick={getPosition}>
        {isLoadingPosition ? 'Loading...' : 'Use your position'}
      </Button>}
      <MapContainer
        center={[mapLat || 50, mapLng || 2]}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map(city => (
          <Marker key={city.id} position={[city.position.lat, city.position.lng]}>
            <Popup>
              {city.cityName}, {city.country} <br /> {city.emoji}
            </Popup>
          </Marker>
        ))}
        <DetectClick />
        <ChangeCenter position={mapPosition} />
      </MapContainer>
    </div>
  )
}

const DetectClick = (e) => {
  const navigate = useNavigate()
  useMapEvents({
    click: (e) => { navigate(`form/?lat=${e.latlng.lat}&lng=${e.latlng.lng}`) }
  })
}

const ChangeCenter = ({ position }) => {
  const map = useMap()
  map.setView(position)
  return null
}
