import { voteBlog, deleteBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import CommentForm from './CommentForm'

const Blog = () => {
  const id = useParams().id
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id))
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    dispatch(voteBlog(updatedBlog))
  }

  const handleDelete = () => {
    if (!window.confirm(`Delete blog '${blog.title}' by ${blog.author}?`)) {
      return
    }
    dispatch(deleteBlog(blog))
  }
  if (!blog) {
    return null
  }

  return (
    <div>
      <h1>
        {blog.title}, {blog.author}
      </h1>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes <button onClick={handleLike}>Like</button>
      </p>
      <p>added by {blog.user ? blog.user.name || blog.user.username : null}</p>
      {blog.user.username === user.username && (
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
      )}
      <h2>Comments</h2>
      <CommentForm blog={blog} />
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
