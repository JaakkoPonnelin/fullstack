require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

const Person = require('./models/person')

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('dist'))

const password = process.argv[2]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })

  app.get('/info', (request, response) => {
    const time = new Date()
    const personsNum = persons.length
    response.send(`<div>Phonebook has info for ${personsNum} people</div><div>${time}<div>`)
  })

  app.get('/api/persons', (request, response) => {
    Person.find({}).then(person => {
      response.json(person)
    })
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    Person.findById(id).then(person => {
      response.json(person)
    })
  })

  app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
      return response.status(400).json({
        error: 'name and/or number missing'
      })
    }

    const person = new Person({
      name: body.name,
      number: body.number,
      id: generateId()
    })

    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    Person.findByIdAndDelete(id).then(() => response.status(204).end())
  })
  
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

const generateId = () => {
    return Math.floor(Math.random() * (50000 - 1) + 1)
}