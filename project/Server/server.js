const express = require('express')
const app = express()
const mongoose = require('mongoose')
  const Product = require('./models/product')
const Onenew= require('./models/onenew')
const Newton= require('./models/newtonn')
app.use(express.json())
mongoose.connect('mongodb+srv://Timedown:pumper2013@cluster0-0vrxp.mongodb.net/numerical?retryWrites=true&w=majority', { useNewUrlParser: true })

// สร้าง database schema
const Cat = mongoose.model('Cat', { name: String })

// สร้าง instance จาก model
const kitty = new Cat({ name: 'JavaScript' })

// save ลง database (return เป็น Promise)
kitty.save().then(() => console.log('meow'))

// mock data
const products = [{
  
}]

app.get('/bisections', async (req, res) => {
  const products = await Product.findOne({ id: Math.floor(Math.random() * 4 + 1) })
  res.json(products)
})
app.get('/flaseposition', async (req, res) => {
  const products = await Product.findOne({ id: Math.floor(Math.random() * 4 + 1) })
  res.json(products)
})
app.get('/onepoint', async (req, res) => {
  const products = await Onenew.findOne({ id: Math.floor(Math.random() * 2 + 1) })
  res.json(products)
})
app.get('/newton', async (req, res) => {
  const products = await Newton.findOne({ id: Math.floor(Math.random() * 3 + 1) })
  res.json(products)
})
app.get('/secant', async (req, res) => {
  const products = await Product.findOne({ id: Math.floor(Math.random() * 4 + 1) })
  res.json(products)
})
app.get('/products/:id', (req, res) => {
  const { id } = req.params
  const result = products.find(product => product.id === id)
  res.json(result)
})

app.post('/bisections', async (req, res) => {
    const payload = req.body
    const product = new Product(payload)
    await product.save()
    res.status(201).end()
  })  
  app.post('/onenew', async (req, res) => {
    const payload = req.body
    const product = new Onenew(payload)
    await product.save()
    res.status(201).end()
  })
  app.post('/newtonn', async (req, res) => {
    const payload = req.body
    const product = new Newton(payload)
    await product.save()
    res.status(201).end()
  })

app.put('/products/:id', (req, res) => {
  const { id } = req.params
  res.json({ id })
})

app.delete('/products/:id', (req, res) => {
  const { id } = req.params
  res.json({ id })
})

app.listen(9000, () => {
  console.log('Application is running on port 9000')
})