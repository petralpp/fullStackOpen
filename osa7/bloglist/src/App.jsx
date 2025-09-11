import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from './reducers/blogReducer'
import { initUsers } from './reducers/usersReducer'
import { setCurrentUser } from './reducers/currentUserReducer'
import loginService from './services/login'
import storageService from './services/localStorage'
import blogService from './services/blogs'
import Navigation from './components/Navigation'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import ToggleBlogForm from './components/ToggleBlogForm'
import Notification from './components/Notification'
import UserList from './components/UserList'
import User from './components/User'
import './App.css'

const App = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      dispatch(initBlogs())
      dispatch(initUsers())
    } else {
      const foundUser = storageService.getUser('loggedBlogappUser')
      if (foundUser && loginService.isTokenValid(foundUser.token)) {
        dispatch(setCurrentUser(foundUser))
        blogService.setToken(foundUser.token)
      }
    }
  }, [dispatch, user])

  const handleLogout = () => {
    storageService.removeUser('loggedBlogappUser')
    dispatch(setCurrentUser(null))
  }

  return (
    <div>
      {user ? (
        <>
          <div id="top-bar">
            <Navigation />
            <div id="user-bar">
              <p>{user.name ? user.name : user.username} logged in</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
          <h2>Blogs</h2>
          <Notification />
          <ToggleBlogForm />
          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/blogs/:id" element={<Blog />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/users" element={<UserList />} />
          </Routes>
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
