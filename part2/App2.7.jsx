import { useState } from 'react'
import Note from './components/Note'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' },
  ]) 
  const [newName, setNewName] = useState('') 

  const addName = (event) => {
    event.preventDefault()

    const nameExists = persons.some(person => person.name === newName)
    if (nameExists) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const nameObject = { name: newName }
      setPersons(persons.concat(nameObject))
    }
    setNewName('')
  }

  const handleNoteChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input
            value={newName}
            onChange={handleNoteChange}
          />
        </div>
        <div>
          number: <input
          value={newNumber}
          onChange={handleNoteChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {persons.map(name => 
          <Note key={name.name} note={name} />
        )}
    </div>
  )
}

export default App