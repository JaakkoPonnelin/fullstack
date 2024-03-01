import { useState } from 'react'
import Note from './components/Note'
import Form from './components/Form'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1231244'},
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    const nameExists = persons.some(person => person.name === newName)
    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const nameObject = { name: newName, number: newNumber}
      setPersons(persons.concat(nameObject))
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