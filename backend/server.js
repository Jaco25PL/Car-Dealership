const express = require('express') // intit express
const bodyParser = require('body-parser')
const carsRoutes = require('./routes/cars')

const app = express()
const PORT = 3456

app.use(bodyParser.json())
app.use('/cars', carsRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
