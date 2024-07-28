import { useState, useEffect } from "react"
// import cars from "../../public/mock/cars.json"

interface Datasheet {
    hp: number
    engine: string
    fuel: string
    consumption: string
    torque: string
    max_speed: string
    weight: string
    kilometers: number
    features: string[]
    drivetrain: string
    transmission: string
  }
  
  interface SellerInfo {
    name: string
    contact: string
    address: string
  }
  
  interface Car {
    id: number
    chasis: string
    brand: string
    model: string
    year: number
    price: number
    color: string[]
    condition: string
    datasheet: Datasheet
    license_plate: string
    date_added: string
    photos: string[]
    seller_info: SellerInfo
    warranty_info: string
  }

// const cars = {
//     id: 1,
//     chasis: 'sedan',
//     brand: 'Toyota',
//     model: 'Camry',
//     year: 2024,
//     price: 30000,
//     color: ['Black', 'White', 'Silver', 'Blue'],
//     condition: 'brand new',
//     datasheet: {
//       hp: 203,
//       engine: '2.5L Inline-4',
//       fuel: 'gasoline',
//       consumption: '8.2 L/100 km',
//       torque: '184 lb-ft',
//       max_speed: '210 km/h',
//       weight: '1475 kg',
//       kilometers: 0,
//       features: ['Adaptive Cruise Control', 'Lane Departure Warning', 'Wireless Charging'],
//       drivetrain: 'FWD',
//       transmission: 'Automatic',
//     },
//     license_plate: 'ABC1234',
//     date_added: '2024-07-18',
//     photos: ['https://tmna.aemassets.toyota.com/is/image/toyota/toyota/jellies/max/2024/camryhybrid/xsehybrid/2557/2pt/36/5.png?fmt=png-alpha&wid=930&qlt=90'],
//     seller_info: {
//       name: 'John Doe',
//       contact: 'john@example.com',
//       address: '123 Main St, Anytown, USA',
//     },
//     warranty_info: '3 years or 36,000 miles warranty',
//   }


export function Cars_Card () {

//   const [showMore, setShowMore] = useState<boolean>(false)

    const [cars, setCars] = useState<Car[]>([])
    const [showMore, setShowMore] = useState<number | null>(null)

    useEffect(() => {
        const fetchCars = async () => {
            const response = await fetch('/cars.json')
            const data = await response.json()
            setCars(data)
        }
        fetchCars()
    }, [])

    return (

        <div>
      <h1>Cars List</h1>
      {cars.map(car => (
        <div key={car.id} className="bg-gray-700 shadow-md rounded p-4 mt-4 max-w-md mx-auto">
          <img src={car.photos[0]} alt={`${car.brand} ${car.model}`} className="w-full h-48 object-cover rounded" />
          <h3 className="text-xl mt-2">{`${car.brand} ${car.model}`}</h3>
          <p><strong>Year:</strong> {car.year}</p>
          <p className="text-lg font-semibold">${car.price}</p>
          <button
            className="mt-2 bg-gray-900 text-white py-2 px-4 rounded"
            onClick={() => setShowMore(showMore === car.id ? null : car.id)}
          >
            {showMore === car.id ? 'Show Less' : 'Show More'}
          </button>
          {showMore === car.id && (
            <div className="mt-4">
              <p><strong>Condition:</strong> {car.condition}</p>
              <p><strong>Color:</strong> {car.color.join(', ')}</p>
              <h4 className="mt-2 font-semibold">Datasheet</h4>
              <p><strong>HP:</strong> {car.datasheet.hp}</p>
              <p><strong>Engine:</strong> {car.datasheet.engine}</p>
              <p><strong>Fuel:</strong> {car.datasheet.fuel}</p>
              <p><strong>Consumption:</strong> {car.datasheet.consumption}</p>
              <p><strong>Torque:</strong> {car.datasheet.torque}</p>
              <p><strong>Max Speed:</strong> {car.datasheet.max_speed}</p>
              <p><strong>Weight:</strong> {car.datasheet.weight}</p>
              <p><strong>Kilometers:</strong> {car.datasheet.kilometers}</p>
              <p><strong>Features:</strong> {car.datasheet.features.join(', ')}</p>
              <p><strong>Drivetrain:</strong> {car.datasheet.drivetrain}</p>
              <p><strong>Transmission:</strong> {car.datasheet.transmission}</p>
            </div>
          )}
        </div>
      ))}
    </div>

    )
}