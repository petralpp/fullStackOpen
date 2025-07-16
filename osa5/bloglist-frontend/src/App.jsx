import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (username, password) => {
    const userObject = await loginService.login({username, password})
    if (userObject) {
      setUser(userObject)
    }
  }

  return (
    <div>
      { user ?
      <>
        <h2>Blogs</h2>
        <p>{user.name || user.username} logged in</p>
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