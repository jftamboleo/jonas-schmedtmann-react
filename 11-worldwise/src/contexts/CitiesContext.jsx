import { useReducer, useEffect, createContext, useContext, useCallback } from 'react'

const BASE_URL = 'http://localhost:8000'

const CitiesContext = createContext()

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: ''
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'loading': {
      return {
        ...state,
        isLoading: true
      }
    }
    case 'cities/loaded': {
      return {
        ...state,
        cities: action.payload,
        isLoading: false
      }
    }
    case 'city/loaded': {
      return {
        ...state,
        currentCity: action.payload,
        isLoading: false
      }
    }
    case 'city/added': {
      return {
        ...state,
        cities: [...state.cities, action.payload],
        isLoading: false,
        currentCity: action.payload
      }
    }
    case 'city/deleted': {
      return {
        ...state,
        cities: state.cities.filter(city => city.id !== action.payload),
        isLoading: false
      }
    }
    case 'rejected': {
      return {
        ...state,
        error: action.payload,
        isLoading: false
      }
    }
    default: {
      throw new Error('Unknown action')
    }
  }
}

export const CitiesProvider = ({ children }) => {
  const [{
    cities,
    isLoading,
    currentCity
  }, dispatch] = useReducer(reducer, initialState)

  const loading = () => {
    dispatch({ type: 'loading' })
  }
  const citiesLoaded = (cities) => {
    dispatch({ type: 'cities/loaded', payload: cities })
  }
  const rejected = (error) => {
    dispatch({ type: 'rejected', payload: error })
  }
  const cityLoaded = (city) => {
    dispatch({ type: 'city/loaded', payload: city })
  }
  const cityAdded = (city) => {
    dispatch({ type: 'city/added', payload: city })
  }
  const cityDeleted = (id) => {
    dispatch({ type: 'city/deleted', payload: id })
  }

  useEffect(() => {
    loading()
    const getCities = async () => {
      try {
        const res = await fetch(`${BASE_URL}/cities`)
        if (!res.ok) throw new Error('Error fetching cities')
        const data = await res.json()
        citiesLoaded(data)
      } catch (err) {
        rejected(err.message)
      }
    }
    getCities()
  }, [])

  const getCity = useCallback(async (id) => {
    if (currentCity.id === id) return
    loading()
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`)
      if (!res.ok) throw new Error('Error getting city')
      const data = await res.json()
      cityLoaded(data)
    } catch (err) {
      rejected(err.message)
    }
  }, [currentCity.id])

  const addCity = async (newCity) => {
    loading()
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: { 'Content-Type': 'application/json' }
      })
      if (!res.ok) throw new Error('Error adding city')
      const data = await res.json()
      cityAdded(data)
    } catch (err) {
      rejected(err.message)
    }
  }

  const deleteCity = async (id) => {
    loading()
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE'
      })
      if (!res.ok) throw new Error('Error deleting city')
      cityDeleted(id)
    } catch (err) {
      rejected(err.message)
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        deleteCity,
        addCity
      }}
    >
      {children}
    </CitiesContext.Provider>
  )
}

export const useCities = () => {
  const context = useContext(CitiesContext)
  if (context === undefined) throw new Error('CitiesContext used outside CitiesProvider')
  return context
}
