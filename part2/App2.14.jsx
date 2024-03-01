import { useState, useEffect } from 'react'
import Note from './components/Note'
import Form from './components/Form'
import noteService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setPersons(initialNotes)
      })
  }, [])

  const deleteID = (id) => {
      noteService
      .deleteID(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
  }
  
  const addPerson = (event) => {
    event.preventDefault()

    const nameExists = persons.some(person => person.name === newName)
    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = { name: newName, number: newNumber}
      noteService
        .create(personObject)
        .then((returnedNote) => {
          setPersons(persons.concat(returnedNote))
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
          <Note key={name.name} note={name} deleteID={deleteID}/>
        )}
    </div>
  )
}

export default App