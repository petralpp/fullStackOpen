/* eslint-disable react/prop-types */
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreateNew from './components/CreateNew'
import Menu from './components/Menu'
import AnecdoteList from './components/AnecdoteList'
import Anecdote from './components/Anecdote'
import About from './components/About'
import Footer from './components/Footer'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <BrowserRouter>
      <div>
        <h1>Software anecdotes</h1>
        <Menu />
          <Routes>
            <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />}></Route>
            <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes}/>}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/create" element={<CreateNew addNew={addNew} />}></Route>
          </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
