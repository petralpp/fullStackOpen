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
      const userObject = await loginService.login({ username, password })
      if (userObject) {
        setUser(userObject)
        blogService.setToken(userObject.token)
        window.localStorage.setItem(
          'loggedBlogappUser', JSON.stringify(userObject)
        )
      }
    } catch (exception) {
      console.log(exception)
      setNotification({ message: exception.response.data.error, type: 'error' })
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
        setNotification({ message: `A new blog ${savedBlog.title} by ${savedBlog.author} added`, type: 'success' })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      }
    } catch (exception) {
      setNotification({ message: exception.response.data.error, type: 'error' })
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
      setNotification({ message: exception.response.data.error, type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const deleteBlog = async (blog) => {
    try {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
      setNotification({ message: `Blog ${blog.title} removed`, type: 'success' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      console.log(exception)
      setNotification({ message: exception.response.data.error, type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const sortBlogs = (blogs) => {
    const sortedBlogs = blogs.sort((a,b) => {
      if (a.likes > b.likes) {
        return -1
      } else if (b.likes > a.likes) {
        return 1
      } else {
        return 0
      }
    })
    return sortedBlogs
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
          {sortBlogs(blogs).map(blog =>
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user}/>
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