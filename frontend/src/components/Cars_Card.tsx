import { useState, useEffect } from "react"
import { Car } from "../types/cars"
// import cars from "../../public/mock/cars.json"



export function Cars_Card () {

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