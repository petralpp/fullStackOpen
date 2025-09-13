import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { commentBlog } from '../reducers/blogReducer'

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
      <input type="text" value={comment} onChange={handleChange} />
      <button>Add comment</button>
    </form>
  )
}

export default CommentForm
