const express = require('express')
const cars = require('./db/cars.json')

// const carsRoutes = require('./routes/cars')

const app = express()
app.disable('x-powered-by')
app.use(express.json())

const PORT = process.env.PORT ?? 3456

// app.use('/cars', carsRoutes)

app.get('/' , (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')

  res.json(cars)
})


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})