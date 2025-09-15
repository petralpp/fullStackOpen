import { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { createBlog } from '../reducers/blogReducer'
import { TextField, Button } from '@mui/material'

const BlogForm = ({ toggleForm }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url,
    }
    dispatch(createBlog(newBlog))
    toggleForm(false)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form id="blog-form" onSubmit={handleSubmit}>
      <TextField
        id="title"
        label="Title"
        size="small"
        value={title}
        onChange={(event) => {
          setTitle(event.target.value)
        }}
      />
      <TextField
        id="author"
        label="Author"
        size="small"
        value={author}
        onChange={(event) => {
          setAuthor(event.target.value)
        }}
      />
      <TextField
        id="url"
        label="Url"
        type="Url"
        size="small"
        value={url}
        onChange={(event) => {
          setUrl(event.target.value)
        }}
      />
      <Button variant="contained" color="primary" type="submit">
        Add
      </Button>
      <Button variant="contained" color="primary" onClick={() => toggleForm(false)}>
        Cancel
      </Button>
    </form>
  )
}

BlogForm.propTypes = {
  toggleForm: PropTypes.func.isRequired,
}

export default BlogForm
