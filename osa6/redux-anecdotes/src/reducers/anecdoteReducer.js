import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    changeAnecdote(state, action) {
      return state.map(a => {
        if (a.id !== action.payload.id) {
          return a
        } else {
          return action.payload
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

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const object = { ...anecdote, votes: anecdote.votes+1 }
    const newAnecdote = await anecdoteService.modify(object)
    dispatch(changeAnecdote(newAnecdote))
  }
}

export const { changeAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer