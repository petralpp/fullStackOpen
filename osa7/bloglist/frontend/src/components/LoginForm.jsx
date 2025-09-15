import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/currentUserReducer'
import { TextField, Button } from '@mui/material'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(loginUser(username, password))
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id="username"
        label="Username"
        size="small"
        value={username}
        onChange={(event) => {
          setUsername(event.target.value)
        }}
      />
      <TextField
        id="password"
        label="Password"
        type="password"
        size="small"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value)
        }}
      />
      <Button variant="contained" color="primary" type="submit">
        Login
      </Button>
    </form>
  )
}

export default LoginForm
