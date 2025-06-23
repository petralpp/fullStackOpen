import { useState, useEffect } from 'react'
import './App.css'
import calls from './services/calls'
import BlogTable from './components/BlogTable'
import BlogForm from './components/BlogForm'

function App() {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    calls.getBlogs()
      .then(result => {
          setBlogs(result)
      }
     )
  }, [])

  const saveBlog = (blog) => {
    calls.addBlog(blog)
    .then(savedBlog => {
      setBlogs([...blogs, savedBlog])
    })
    .catch(error => console.log(error.message))
  }

  const removeBlog = (id) => {
    calls.deleteBlog(id)
    .then(() => setBlogs(blogs.filter(b => b.id !== id)))
    .catch(error => console.log(error.message))
  }

  return (
    <div>
      <BlogForm saveBlog={saveBlog} />
      <BlogTable blogs={blogs} removeBlog={removeBlog}/>
    </div>
  )
}

export default App
