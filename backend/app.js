const express = require('express')
const cars = require('./db/cars.json')
const crypto = require('node:crypto')
const { validateCar, validatePartialCar } = require('./schemas/cars')
// const carsRoutes = require('./routes/cars')

const app = express()
app.disable('x-powered-by')
app.use(express.json())

const PORT = process.env.PORT ?? 3456

// app.use('/cars', carsRoutes)

app.get('/cars/:id' , (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')

  const { id } = req.params // Get ID from the request param
  const car = cars.find( car => car.id === parseInt(id))
  if ( car ) return res.json( car )

  res.status(404).json({ message: "Car not found" })
})

app.get('/cars' , (req , res) => {

  res.header('Access-Control-Allow-Origin', '*')

  const { year, chasis, brand, model, condition } = req.query
  if( year ) {
    const filterByYear = cars.filter(
      car => parseInt(car.year) === parseInt(year)
    )
    return res.json(filterByYear)
  }

  if( chasis ) {
    const filterByChasis = cars.filter(
      car => car.chasis.toLowerCase() === chasis.toLowerCase()
    )
    return res.json(filterByChasis)
  }

  if( brand ) {
    const filterByBrand = cars.filter(
      car => car.brand.toLowerCase() === brand.toLowerCase()
    )
    return res.json(filterByBrand)
  }

  if( model ) {
    const filterByModel = cars.filter(
      car => car.model.toLowerCase() === model.toLowerCase()
    )
    return res.json(filterByModel)
  }

  if ( condition ) {
    const filterByCondition = cars.filter(
      car => car.condition.toLowerCase() === condition.toLowerCase()
    )
    return res.json(filterByCondition)
  }


  res.json(cars)

})



app.post('/cars' , (req, res) => {

  const result = validateCar(req.body) // we send the body request to our validation schema
  if (!result.success) {
    return res.status(400).json({ error : JSON.parse(result.error.message) })
  }

  const newCar = {
    id: crypto.randomUUID(),
    ...result.data
  }

  // cars.push(newCar) // push to the database
  res.status(201).json(newCar)
})



app.patch('/cars/:id' , (req, res) => {

  const result = validatePartialCar(req.body)
  if(!result.success) {
    return res.status(400).json({ error : JSON.parse(result.error.message) })
  }

  const { id } = req.params
  const carIndex = cars.findIndex( car => car.id == id) // fix later
  if ( carIndex === -1 ) {
    return res.status(404).json({ message: "Car not found" })
  }

  const updateCar = {
    ...cars[carIndex],
    ...result.data
  }

  cars[carIndex] = updateCar

  return res.json(updateCar)
})

app.options('/cars/:id', (req, res) => {
    // This is for CORS, because delete is a complex methos needs this options method
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')

    res.send(200)
})


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})