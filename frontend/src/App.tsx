import './App.css'
import { useState } from 'react'

const cars = {
  id: 1,
  chasis: 'sedan',
  brand: 'Toyota',
  model: 'Camry',
  year: 2024,
  price: 30000,
  color: ['Black', 'White', 'Silver', 'Blue'],
  condition: 'brand new',
  datasheet: {
    hp: 203,
    engine: '2.5L Inline-4',
    fuel: 'gasoline',
    consumption: '8.2 L/100 km',
    torque: '184 lb-ft',
    max_speed: '210 km/h',
    weight: '1475 kg',
    kilometers: 0,
    features: ['Adaptive Cruise Control', 'Lane Departure Warning', 'Wireless Charging'],
    drivetrain: 'FWD',
    transmission: 'Automatic',
  },
  license_plate: 'ABC1234',
  date_added: '2024-07-18',
  photos: ['https://tmna.aemassets.toyota.com/is/image/toyota/toyota/jellies/max/2024/camryhybrid/xsehybrid/2557/2pt/36/5.png?fmt=png-alpha&wid=930&qlt=90'],
  seller_info: {
    name: 'John Doe',
    contact: 'john@example.com',
    address: '123 Main St, Anytown, USA',
  },
  warranty_info: '3 years or 36,000 miles warranty',
};

function App() {

  const [showMore, setShowMore] = useState(false)

  return (

    <div className="min-h-screen p-4">
    {/* Navigation */}
    <nav className=" p-4">
      <h1 className="text-xl">Car Dealership</h1>
    </nav>

    {/* Header */}
    <header className=" p-4 mt-4">
      <h2 className="text-2xl">Welcome to Our Car Dealership</h2>
    </header>

    {/* Car Display */}
    <div className="bg-gray-700 shadow-md rounded p-4 mt-4 max-w-md mx-auto">
      <img src={cars.photos[0]} alt={`${cars.brand} ${cars.model}`} className="w-full h-48 object-cover rounded" />
      <h3 className="text-xl mt-2">{`${cars.brand} ${cars.model}`}</h3>
      <p><strong>Year:</strong> {cars.year}</p>
      <p className="text-lg font-semibold">${cars.price}</p>
      <button
        className="mt-2 bg-gray-900 text-white py-2 px-4 rounded"
        onClick={() => setShowMore(!showMore)}
      >
        {showMore ? 'Show Less' : 'Show More'}
      </button>

      {showMore && (
        <div className="mt-4">
          <p><strong>Condition:</strong> {cars.condition}</p>
          <p><strong>Color:</strong> {cars.color.join(', ')}</p>
          <h4 className="mt-2 font-semibold">Datasheet</h4>
          <p><strong>HP:</strong> {cars.datasheet.hp}</p>
          <p><strong>Engine:</strong> {cars.datasheet.engine}</p>
          <p><strong>Fuel:</strong> {cars.datasheet.fuel}</p>
          <p><strong>Consumption:</strong> {cars.datasheet.consumption}</p>
          <p><strong>Torque:</strong> {cars.datasheet.torque}</p>
          <p><strong>Max Speed:</strong> {cars.datasheet.max_speed}</p>
          <p><strong>Weight:</strong> {cars.datasheet.weight}</p>
          <p><strong>Kilometers:</strong> {cars.datasheet.kilometers}</p>
          <p><strong>Features:</strong> {cars.datasheet.features.join(', ')}</p>
          <p><strong>Drivetrain:</strong> {cars.datasheet.drivetrain}</p>
          <p><strong>Transmission:</strong> {cars.datasheet.transmission}</p>
        </div>
      )}
    </div>
  </div>

  )
}

export default App
