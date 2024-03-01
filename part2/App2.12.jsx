import { useState, useEffect } from 'react'
import Note from './components/Note'
import Form from './components/Form'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const nameExists = persons.some(person => person.name === newName)
    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = { name: newName, number: newNumber}
      axios
        .post('http://localhost:3001/persons', personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
        })
    }

    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Form
      onSubmit={addPerson}
      nameValue={newName}
      nameOnChange={handleNameChange}
      numberValue={newNumber}
      numberOnChange={handleNumberChange}
      />
      <h2>Numbers</h2>
        {persons.map(name => 
          <Note key={name.name} note={name} />
        )}
    </div>
  )
}

export default App