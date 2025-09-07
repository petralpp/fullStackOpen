import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import loginService from './services/login'
import storageService from './services/localStorage'
import blogService from './services/blogs'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import './App.css'

const App = () => {
  const user = useSelector((state) => state.user)
  const [showBlogForm, setShowBlogForm] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      dispatch(initBlogs())
    } else {
      const foundUser = storageService.getUser('loggedBlogappUser')
      if (foundUser && loginService.isTokenValid(foundUser.token)) {
        dispatch(setUser(foundUser))
        blogService.setToken(foundUser.token)
      }
    }
  }, [dispatch, user])

  const handleLogout = () => {
    storageService.removeUser('loggedBlogappUser')
    dispatch(setUser(null))
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
          <LoginForm />
        </>
      )}
    </div>
  )
}

export default App
