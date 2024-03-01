import { useState, useEffect } from 'react'
import Note from './components/Note'
import Form from './components/Form'
import axios from 'axios'

const App = () => {
  console.log('Appa')
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const state = useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)a
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const nameExists = persons.some(person => person.name === newName)
    console.log('b')
    if (nameExists) {
      console.log('c')
      alert(`${newName} is already added to phonebook`)
    } else {
      console.log('a')
      const personObject = { name: newName, number: newNumber}
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