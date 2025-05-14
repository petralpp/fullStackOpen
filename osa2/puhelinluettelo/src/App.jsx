import { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import Notification from './Notification'
import calls from './services/calls'
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMsg, setErrorMsg] = useState(false)

  useEffect(() => {
    calls.getAll()
      .then(persons =>
        setPersons(persons)
     )
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  }

  const handleDelete = (name) => {
    const foundPerson = persons.find((person) => person.name === name);
    const id = foundPerson.id
    calls.remove(id).then(res => {
      const newList = persons.filter(p => p.id !== res.data.id)
      setPersons(newList)
    })
    setMessage(`Deleted ${name}`);
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const found = persons.find((person) => person.name === newName);
    if (found === undefined) {
      const newPerson = {name: newName, number: newNumber};
      calls.create(newPerson)
        .then(person => {
          setPersons(persons.concat(person));
          setMessage(`Added ${person.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setNewName('');
          setNewNumber('');
      })
    } else {
      if (confirm(`${found.name} is already added to phonebook, replace the old number with a new one ?`)) {
        const modifiedPerson = {name: newName, number: newNumber};
        calls.update(found.id, modifiedPerson).then(person => {
          setPersons(persons.map(p => {
            if (p.id === person.id)
              return person;
            else
              return p;
          }));
          setMessage(`Changed the number of ${modifiedPerson.name}`);
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setNewName('');
          setNewNumber('');
        }).catch(error => {
          console.log(error);
          setErrorMsg(true)
          setMessage(`Information of ${modifiedPerson.name} has already been removed from server`);
          setTimeout(() => {
            setMessage(null)
            setErrorMsg(false)
          }, 5000)
        })
      }
    }
  } 

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} errorMsg={errorMsg}/>
      <Filter searchWord={search} handleSearch={handleSearchChange}/>
      <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} 
        handleNumberChange={handleNumberChange} handleSubmit={handleSubmit}/>
      <h2>Numbers</h2>
      <Persons filterWord={search} personList={persons} onClick={handleDelete}/>
    </div>
  )

}

export default App
