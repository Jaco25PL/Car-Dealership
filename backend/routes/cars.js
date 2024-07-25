const express = require('express')
const fs = require('fs')
const path = require('path')
const { z } = require('zod')

const router = express.Router()
const carsFilePath = path.join(__dirname, '../data/cars.json') // we use the json library for validation

// Zod schema for car validation
const carSchema = z.object({
  id: z.number().nonnegative(),
  chasis: z.enum(['pickup', 'sedan', 'coupe', 'suv']),
  brand: z.string(),
  model: z.string(),
  year: z.number().min(1886).max(new Date().getFullYear()),
  price: z.number().nonnegative(),
  color: z.array(z.string()).min(1).max(5),
  condition: z.enum(['used', 'brand new']),
  datasheet: z.object({
    hp: z.number().nonnegative(),
    engine: z.string(),
    fuel: z.enum(['gasoline', 'diesel']),
    consumption: z.string(),
    torque: z.string(),
    max_speed: z.string(),
    weight: z.string(),
    kilometers: z.number().nonnegative(),
    features: z.array(z.string()),
    drivetrain: z.string(),
    transmission: z.string(),
  }),
})

// Helper function to read and write cars data
const readCarsData = () => {
  const data = fs.readFileSync(carsFilePath)
  return JSON.parse(data)
}

const writeCarsData = (data) => {
  fs.writeFileSync(carsFilePath, JSON.stringify(data, null, 2))
}

// Get all cars
router.get('/cars', (req, res) => {
  const cars = readCarsData()
  res.json(cars)
})

// Filter cars by brand or year
router.get('/filter', (req, res) => {
  const { brand, year } = req.query
  let cars = readCarsData()

  if (brand) {
    cars = cars.filter((car) => car.brand.toLowerCase() === brand.toLowerCase())
  }
  if (year) {
    cars = cars.filter((car) => car.year === parseInt(year))
  }

  res.json(cars)
})

// Create a new car
router.post('/', (req, res) => {
  try {
    const cars = readCarsData()
    const newCar = carSchema.parse({ ...req.body, id: cars.length + 1})
    cars.push(newCar)
    writeCarsData(cars)
    res.status(201).json(newCar)
  } catch (e) {
    res.status(400).json({ error: e.errors })
  }
})

// Update a car by index
router.put('/:id', (req, res) => {
  try {
    const { id } = req.params
    const updatedCar = carSchema.parse(req.body)
    const cars = readCarsData()
    const carIndex = cars.findIndex(car => car.id === parseInt(id))

    if (carIndex === -1) {
      return res.status(404).json({ error: 'Car not found' })
    }

    cars[carIndex] = { ...updatedCar, id: parseInt(id) } // Ensire the ID is not changed
    writeCarsData(cars)
    res.json(updatedCar)
  } catch (e) {
    res.status(400).json({ error: e.errors })
  }
})

// Delete a car by index
router.delete('/:id', (req, res) => {
  const { id } = req.params
  const cars = readCarsData()
  const carIndex = cars.findIndex( car => car.id === parseInt(id))

  if (carIndex === -1) {
    return res.status(404).json({ error: 'Car not found' })
  }

  const deletedCar = cars.splice(carIndex, 1)
  writeCarsData(cars)
  res.json(deletedCar)
})

module.exports = router
