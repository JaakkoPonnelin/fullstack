import { useState, useEffect } from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Form from './components/Form'
import noteService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setPersons(initialNotes)
      })
  }, [])

  const deletePerson = (note) => {
    noteService
    .deleteID(note.id)
    .then(() => {
      setPersons(persons.filter(person => person.id !== note.id))
      showErrorMessage(`${note.name} was succesfully deleted from phonebook`)
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
        showErrorMessage(`${newName} was succesfully added to phonebook`)
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

  const showErrorMessage = (message) => {
    setErrorMessage(
      message
    )
    
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  return (
    <div>
      <Notification message={errorMessage} />
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
          <Note key={name.name} note={name} deletePerson={deletePerson}/>
        )}
    </div>
  )
}

export default App