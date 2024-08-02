import { useEffect, useState } from 'react';
import './App.css'
import { Cars_Display } from './components/Cars_Display';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { Cars } from './types/cars';


function App() {

  const [ cars , setCars ] = useState<Cars[]>([])

  useEffect(() => {

    function fetchCars () {
      const URL = 'http://localhost:3456/cars'

      fetch(URL)
        .then(res => res.json())
        .then(cars => {
          setCars(cars)
        })
    }

    fetchCars()

  }, [])

  return (

    <div className="min-h-screen">
    {/* Navigation */}
      <Navigation/>

    {/* Header */}
      <Header/>

    {/* Car Display */}
      <Cars_Display cars={cars} />

  </div>

  )
}

export default App
