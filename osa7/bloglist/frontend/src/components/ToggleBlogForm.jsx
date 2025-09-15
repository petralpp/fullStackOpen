import { useState } from 'react'
import BlogForm from './BlogForm'
import { Button } from '@mui/material'

const ToggleBlogForm = () => {
  const [showBlogForm, setShowBlogForm] = useState(false)

  const toggleBlogForm = (toggle) => {
    setShowBlogForm(toggle)
  }

  return (
    <>
      {showBlogForm ? (
        <div>
          <h2>Create new blog</h2>
          <BlogForm toggleForm={toggleBlogForm} />
        </div>
      ) : (
        <Button id="new-blog-btn" variant="contained" color="primary" onClick={() => toggleBlogForm(true)}>
          New blog
        </Button>
      )}
    </>
  )
}

export default ToggleBlogForm
