import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const create = (e) => {
        e.preventDefault();
        const anecdote = e.target.anecdote.value
        dispatch(createAnecdote(anecdote))
        dispatch(setNotification(`You added '${e.target.anecdote.value}'`))
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