require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

const Person = require('./models/person')

app.use(express.static('dist'))
app.use(morgan('tiny'))

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(cors())
app.use(express.json())
app.use(requestLogger)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

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

  app.get('/api/persons/:id', (request, response, next) => {
    const id = Number(request.params.id)
    Person.findById(id).then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    }).catch(error => next(error))
  })

  app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (body.name == "" || body.number == "") {
      console.log("gottem")
      return response.status(400).json({
        error: 'name and/or number missing'
      })
    } else {
      const person = new Person({
        name: body.name,
        number: body.number,
        id: generateId()
      })
  
      person.save().then(savedPerson => {
        response.json(savedPerson)
      }).catch(error => next(error))
    }
  })

  app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person.findByIdAndDelete(id).then(() => {
      response.status(204).end()
    }).catch(error => next(error))
  })

const generateId = () => {
    return Math.floor(Math.random() * (50000 - 1) + 1)
}

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})