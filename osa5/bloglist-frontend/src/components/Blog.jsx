import { useState } from "react"

const Blog = ({ blog, updateBlog }) => {
  const [size, setSize] = useState("small")

  const toggleSize = (s) => {
    setSize(s)
  }

  const handleClick = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    updateBlog(updatedBlog)
  }

  if (size == "small") {
    return (
      <div>
        <p>{blog.title} {blog.author} <button onClick={() => toggleSize("big")}>View</button></p>
      </div>
    )
  } else {
    return (
      <div className="blog-div">
        <p>{blog.title} {blog.author} <button onClick={() => toggleSize("small")}>Hide</button></p>
        <p>{blog.url}</p> 
        <p>{blog.likes} <button onClick={handleClick}>Like</button></p>
        <p>{blog.user ? blog.user.name || blog.user.username : null}</p>
      </div>
    )
  }  
}

export default Blog