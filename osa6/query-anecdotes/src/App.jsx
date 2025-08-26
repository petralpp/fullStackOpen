import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './services/requests'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useNotificationDispatch } from './contexts/NotificationContext'

const App = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const result = useQuery(
    {
      queryKey: ['anecdotes'],
      queryFn: getAnecdotes,
      retry: 1
    }
  )

  const updateAnecdoteMutation = useMutation(
    {
      mutationFn: updateAnecdote,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      }
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }
  if ( result.isError ) {
    return <div>anecdote data not available due to problems in server</div>
  }
  const anecdotes = result.data

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes+1 })
    dispatch({type: 'VOTE', payload: anecdote.content})
    setTimeout(() => {
      dispatch({type: 'EMPTY'})
    }, 5000)
  }

  return (
      <div>
        <h3>Anecdote app</h3>
        <Notification />
        <AnecdoteForm />
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
      </div>
  )
}

export default App
