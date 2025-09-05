import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initStore } from './reducers/blogReducer'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import { setNotification } from './reducers/notificationReducer'
import './App.css'

const App = () => {
  const [user, setUser] = useState(null)
  const [showBlogForm, setShowBlogForm] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    let foundUser = window.localStorage.getItem('loggedBlogappUser')
    if (foundUser) {
      foundUser = JSON.parse(foundUser)
      setUser(foundUser)
      blogService.setToken(foundUser.token)
      dispatch(initStore())
    }
  }, [dispatch])

  const handleLogin = async (username, password) => {
    try {
      const userObject = await loginService.login({ username, password })
      if (userObject) {
        setUser(userObject)
        blogService.setToken(userObject.token)
        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(userObject))
      }
    } catch (exception) {
      console.log(exception)
      dispatch(setNotification({ message: exception.response.data.error, type: 'error' }, 5))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const toggleBlogForm = (toggle) => {
    setShowBlogForm(toggle)
  }

  return (
    <div>
      {user ? (
        <>
          <h2>Blogs</h2>
          <Notification />
          <p>{user.name ? user.name : user.username} logged in</p>
          <button onClick={handleLogout}>Logout</button>
          {showBlogForm ? (
            <>
              <h2>Create new blog</h2>
              <BlogForm toggleForm={toggleBlogForm} />
              <button onClick={() => toggleBlogForm(false)}>Cancel</button>
            </>
          ) : (
            <button onClick={() => toggleBlogForm(true)}>New blog</button>
          )}
          <BlogList user={user} />
        </>
      ) : (
        <>
          <h2>Log in to application</h2>
          <Notification />
          <LoginForm login={handleLogin} />
        </>
      )}
    </div>
  )
}

export default App
