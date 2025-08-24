import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const create = async (e) => {
        e.preventDefault();
        const anecdote = e.target.anecdote.value
        const newAnecdote = await anecdoteService.createNew(anecdote)
        dispatch(createAnecdote(newAnecdote))
        dispatch(setNotification(`You added '${anecdote}'`))
        e.target.anecdote.value = ""
        setTimeout(() => {
            dispatch(setNotification(''))
        }, 5000)
    }

    return(
      <div>
        <h2>Create new</h2>
            <form onSubmit={create}>
                <div><input type="text" name="anecdote"/></div>
                <button type="submit">create</button>
            </form>
      </div>
    )
}

export default AnecdoteForm