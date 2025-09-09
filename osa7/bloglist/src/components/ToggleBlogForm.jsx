import { useState } from 'react'
import BlogForm from './BlogForm'

const ToggleBlogForm = () => {
  const [showBlogForm, setShowBlogForm] = useState(false)

  const toggleBlogForm = (toggle) => {
    setShowBlogForm(toggle)
  }

  return (
    <>
      {showBlogForm ? (
        <>
          <h2>Create new blog</h2>
          <BlogForm toggleForm={toggleBlogForm} />
          <button onClick={() => toggleBlogForm(false)}>Cancel</button>
        </>
      ) : (
        <button onClick={() => toggleBlogForm(true)}>New blog</button>
      )}
    </>
  )
}

export default ToggleBlogForm
