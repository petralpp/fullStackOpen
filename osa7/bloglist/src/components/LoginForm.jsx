import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/currentUserReducer'

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
      <div>
        Username
        <input id="username" type="text" name="Username" value={username} onChange={(e) => setUsername(e.target.value)}></input>
      </div>
      <div>
        Password
        <input id="password" type="password" name="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
      </div>
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm
