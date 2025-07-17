import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

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
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = async (blog) => {
    try {
      const savedBlog = await blogService.create(blog)
      if (savedBlog) {
        setBlogs(blogs.concat(savedBlog))
      }
    } catch (exception) {
      console.log(exception)
    }
  }

  return (
    <div>
      { user ?
      <>
        <h2>Blogs</h2>
        <p>{user.name || user.username} logged in</p>
        <button onClick={handleLogout}>Logout</button>
        <h2>Create new blog</h2>
        <BlogForm addBlog={addBlog}/>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </>
        :
      <>
        <h2>Log in to application</h2>
        <LoginForm login={handleLogin}/>
      </>
      }
    </div>
  )
}

export default App