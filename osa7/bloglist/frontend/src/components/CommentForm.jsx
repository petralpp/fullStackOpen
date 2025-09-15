import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { commentBlog } from '../reducers/blogReducer'
import { TextField, Button } from '@mui/material'

const CommentForm = ({ blog }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setComment(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(commentBlog(blog.id, { comment: comment }))
    setComment('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField id="comment" label="Write comment" size="small" value={comment} onChange={handleChange} />
      <Button variant="contained" color="primary" type="submit">
        Add comment
      </Button>
    </form>
  )
}

export default CommentForm
