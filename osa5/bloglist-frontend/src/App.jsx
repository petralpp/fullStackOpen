import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [showBlogForm, setShowBlogForm] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    let foundUser = window.localStorage.getItem('loggedBlogappUser')
    if (foundUser) {
      foundUser = JSON.parse(foundUser)
      setUser(foundUser)
      blogService.setToken(foundUser.token)
    }
  }, [])

  const handleLogin = async (username, password) => {
    try {
      const userObject = await loginService.login({username, password})
      if (userObject) {
        setUser(userObject)
        blogService.setToken(userObject.token)
        window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(userObject)
      ) 
      }
    } catch (exception) {
      console.log(exception)
      setNotification({message: "Invalid username or password", type: "error"})
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const toggleBlogForm = (toggle) => {
    setShowBlogForm(toggle)
  }

  const addBlog = async (blog) => {
    try {
      const savedBlog = await blogService.create(blog)
      if (savedBlog) {
        setBlogs(blogs.concat(savedBlog))
        setNotification({message: `A new blog ${savedBlog.title} by ${savedBlog.author} added`, type: "success"})
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      }
    } catch (exception) {
      console.log(exception)
      setNotification({message: "Title or url missing", type: "error"})
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const updateBlog = async (blog) => {
    try {
      const updatedBlog = await blogService.update(blog)
      setBlogs(blogs.map(b => {
        if (b.id === updatedBlog.id) {
          return updatedBlog
        }
        return b
      }))
    } catch (exception) {
      console.log(exception)
      setNotification({message: "Something went wrong", type: "error"})
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  return (
    <div>
      { user ?
      <>
        <h2>Blogs</h2>
        <Notification message={notification} />
        <p>{user.name ? user.name : user.username} logged in</p>
        <button onClick={handleLogout}>Logout</button>
        { showBlogForm ?
         <>
          <h2>Create new blog</h2>
          <BlogForm addBlog={addBlog} toggleForm={toggleBlogForm}/>
          <button onClick={() => toggleBlogForm(false)}>Cancel</button>
          </>
        : 
        <button onClick={() => toggleBlogForm(true)}>New blog</button>
        }
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} updateBlog={updateBlog}/>
        )}
      </>
        :
      <>
        <h2>Log in to application</h2>
        <Notification message={notification} />
        <LoginForm login={handleLogin}/>
      </>
      }
    </div>
  )
}

export default App