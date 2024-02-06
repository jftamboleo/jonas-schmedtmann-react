import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './pages/HomePage'
import PageNotFound from './pages/PageNotFound'
import Pricing from './pages/Pricing'
import Product from './pages/Product'
import Login from './pages/Login'
import CityList from './components/CityList'
import City from './components/City'
import Form from './components/Form'
import CountryList from './components/CountryList'
import { AppLayout } from './pages/AppLayout'

const BASE_URL = 'http://localhost:8000'

export default function App () {
  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getCities = async () => {
      try {
        setIsLoading(true)
        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()
        setCities(data)
      } catch {
        throw new Error('Error fetching data')
      } finally {
        setIsLoading(false)
      }
    }
    getCities()
  }, [])
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/product' element={<Product />} />
          <Route path='/pricing' element={<Pricing />} />
          <Route path='/login' element={<Login />} />
          <Route path='/app' element={<AppLayout />}>
            <Route index element={<CityList isLoading={isLoading} cities={cities} />} />
            <Route path='cities' element={<CityList isLoading={isLoading} cities={cities} />} />
            <Route path='cities/:id' element={<City />} />
            <Route path='countries' element={<CountryList isLoading={isLoading} cities={cities} />} />
            <Route path='form' element={<Form />} />
          </Route>
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
