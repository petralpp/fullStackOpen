import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    login(username, password)
    setUsername('')
    setPassword('')
  }

  return(
    <form onSubmit={handleSubmit}>
      <div>Username
        <input id='username' type="text" name="Username" value={username} onChange={e => setUsername(e.target.value)}></input>
      </div>
      <div>Password
        <input id='password' type="password" name="Password" value={password} onChange={e => setPassword(e.target.value)}></input>
      </div>
      <button type="submit">Login</button>
    </form>
  )
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
}

export default LoginForm