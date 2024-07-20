const express = require('express')
const fs = require('fs')
const path = require('path')
const { z } = require('zod')

const router = express.Router()
const carsFilePath = path.join(__dirname, '../data/cars.json')

// Zod schema for car validation
const carSchema = z.object({
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
router.get('/', (req, res) => {
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
    const newCar = carSchema.parse(req.body)
    const cars = readCarsData()
    cars.push(newCar)
    writeCarsData(cars)
    res.status(201).json(newCar)
  } catch (e) {
    res.status(400).json({ error: e.errors })
  }
})

// Update a car by index
router.put('/:index', (req, res) => {
  try {
    const { index } = req.params
    const updatedCar = carSchema.parse(req.body)
    const cars = readCarsData()

    if (index >= cars.length) {
      return res.status(404).json({ error: 'Car not found' })
    }

    cars[index] = updatedCar
    writeCarsData(cars)
    res.json(updatedCar)
  } catch (e) {
    res.status(400).json({ error: e.errors })
  }
})

// Delete a car by index
router.delete('/:index', (req, res) => {
  const { index } = req.params
  const cars = readCarsData()

  if (index >= cars.length) {
    return res.status(404).json({ error: 'Car not found' })
  }

  const deletedCar = cars.splice(index, 1)
  writeCarsData(cars)
  res.json(deletedCar)
})

module.exports = router
