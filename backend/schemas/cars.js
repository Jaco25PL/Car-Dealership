const { z } = require('zod')

// Zod schema for car validation

const carSchema = z.object({
  chasis: z.enum(['pickup', 'sedan', 'coupe', 'suv']),
  brand: z.string(),
  model: z.string(),
  year: z.number().min(1800).max(new Date().getFullYear() + 2),
  price: z.number().nonnegative(),
  color: z.array(z.string()).min(1).max(5),
  condition: z.enum(['used', 'brand new']),
  photos: z.array(z.string().url().min(1)),
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

function validateCar ( input ) {
  return carSchema.safeParse( input ) // safeParse will return an object that will say if there is an error or if there is data
}

function validatePartialCar ( input ) {
  return carSchema.partial().safeParse( input ) // Partial for if we want to modify a part of the car's info.
}

module.exports = { validateCar, validatePartialCar }