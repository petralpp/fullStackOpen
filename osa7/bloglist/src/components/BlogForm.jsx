import { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = ({ toggleForm }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url,
    }
    await addBlog(newBlog)
    toggleForm(false)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const addBlog = async (blog) => {
    try {
      dispatch(createBlog(blog))
      dispatch(setNotification({ message: `A new blog ${blog.title} by ${blog.author} added`, type: 'success' }, 5))
    } catch (exception) {
      dispatch(setNotification({ message: exception.response.data.error, type: 'error' }, 5))
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Title
        <input id="title" type="text" name="Title" value={title} onChange={(e) => setTitle(e.target.value)}></input>
      </div>
      <div>
        Author
        <input id="author" type="text" name="Author" value={author} onChange={(e) => setAuthor(e.target.value)}></input>
      </div>
      <div>
        Url
        <input id="url" type="url" name="Url" value={url} onChange={(e) => setUrl(e.target.value)}></input>
      </div>
      <button type="submit">Add</button>
    </form>
  )
}

BlogForm.propTypes = {
  toggleForm: PropTypes.func.isRequired,
}

export default BlogForm
