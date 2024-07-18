import './App.css'

const cars = [
  {
    title: 'Car 1',
    price: '$20,000',
    description: 'A great car with excellent features.',
  },
  {
    title: 'Car 2',
    price: '$25,000',
    description: 'A stylish car with modern design.',
  },
  {
    title: 'Car 3',
    price: '$30,000',
    description: 'A reliable car with great performance.',
  }
]

function App() {

  return (
    <>
     <div className="App">
      <header>
        <h1>Car Dealership</h1>
      </header>
      <div className="car-list">
        {cars.map((car, index) => (
          <div key={index} className="car-card">
            <h2>{car.title}</h2>
            <p>{car.price}</p>
            <p>{car.description}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default App
