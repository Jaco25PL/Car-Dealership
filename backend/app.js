


    const express = require('express');
const bodyParser = require('body-parser');
const { z } = require('zod');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// In-memory car storage
let cars = [];

// Zod schema for car validation
const carSchema = z.object({
  id: z.string(),
  make: z.string(),
  model: z.string(),
  year: z.number().int(),
  price: z.number()
});

// Endpoint to get all cars
app.get('/cars', (req, res) => {
  res.json(cars);
});

// Endpoint to get a car by ID
app.get('/cars/:id', (req, res) => {
  const car = cars.find(c => c.id === req.params.id);
  if (!car) {
    return res.status(404).send('Car not found');
  }
  res.json(car);
});

// Endpoint to create a new car
app.post('/cars', (req, res) => {
  try {
    const newCar = carSchema.parse(req.body);
    cars.push(newCar);
    res.status(201).json(newCar);
  } catch (e) {
    res.status(400).json({ error: e.errors });
  }
});

// Endpoint to update a car by ID
app.put('/cars/:id', (req, res) => {
  const carIndex = cars.findIndex(c => c.id === req.params.id);
  if (carIndex === -1) {
    return res.status(404).send('Car not found');
  }
  
  try {
    const updatedCar = carSchema.parse(req.body);
    cars[carIndex] = updatedCar;
    res.json(updatedCar);
  } catch (e) {
    res.status(400).json({ error: e.errors });
  }
});

// Endpoint to delete a car by ID
app.delete('/cars/:id', (req, res) => {
  const carIndex = cars.findIndex(c => c.id === req.params.id);
  if (carIndex === -1) {
    return res.status(404).send('Car not found');
  }
  cars.splice(carIndex, 1);
  res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});