import App from '../App'

const Note = ({ note, deletePerson }) => {
  const handleDeletion = () => {
    window.confirm(`are you sure you want to delete ${note.name}?`)
    deletePerson(note);
  }

  return (
    <div>
      <button onClick={handleDeletion}>delete</button>
      {note.name} {note.number}
    </div>
  )
}

export default Note