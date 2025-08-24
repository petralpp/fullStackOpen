import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      return state.map(a => {
        if (a.id !== action.payload) {
          return a
        } else {
          return { ...a, votes: a.votes + 1}
        }
      })
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const initStore = () => {
    return async (dispatch) => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const createAnecdote = (anecdote) => {
    return async (dispatch) => {
      const newAnecdote = await anecdoteService.createNew(anecdote)
      dispatch(appendAnecdote(newAnecdote))
    }
}

export const { voteAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer