import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user }) => {
  const [size, setSize] = useState('small')

  const toggleSize = (s) => {
    setSize(s)
  }

  /*
  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    updateBlog(updatedBlog)
  } */

  /*
  const handleDelete = () => {
    if (!window.confirm(`Delete blog '${blog.title}' by ${blog.author}?`)) {
      return
    }
    deleteBlog(blog)
  } */

  if (size === 'small') {
    return (
      <div className="blog-div">
        <p>
          {blog.title} {blog.author}
          <button onClick={() => toggleSize('big')}>View</button>
        </p>
      </div>
    )
  } else {
    return (
      <div className="blog-div">
        <p>
          {blog.title} {blog.author}
          <button onClick={() => toggleSize('small')}>Hide</button>
        </p>
        <p>{blog.url}</p>
        <p>
          {blog.likes} <button>Like</button>
        </p>
        <p>{blog.user ? blog.user.name || blog.user.username : null}</p>
        {blog.user.username === user.username && <button className="delete-button">Delete</button>}
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog
