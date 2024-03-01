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

let persons = [
    {
      name: "Arto Hellas",
      number: "040-123456",
      id: 1
    },
    {
      name: "Ada Lovelace",
      number: "39-44-5323523",
      id: 2
    },
    {
      name: "Dan Abramov",
      number: "12-43-234345",
      id: 3
    },
    {
      name: "Mary Poppendieck",
      number: "39-23-6423122",
      id: 4
    }
  ]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })

  app.get('/info', (request, response) => {
    const time = new Date()
    const personsNum = persons.length
    response.send(`<div>Phonebook has info for ${personsNum} people</div><div>${time}<div>`)
  })

  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    Person.findByID(id).then(person => {
      if (person) {
        response.json(person)
      }
    })

    response.status(404).end()
  })

  app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
      return response.status(400).json({
        error: 'name and/or number missing'
      })
    }

    if (persons.some(person => person.name === body.name)) {
        return response.status(400).json({
            error: 'name is already in Phonebook'
        })
    }

    const person = new Person({
      name: body.name,
      number: body.number,
      id: generateId()
    })

    persons = persons.concat(person)

    response.json(person)
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(persons => persons.id !== id)

    response.status(204).end()
  })
  
  const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

const generateId = () => {
    return Math.floor(Math.random() * (50000 - 1) + 1)
}