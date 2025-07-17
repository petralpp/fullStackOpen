import { useState } from "react"

const Blog = ({ blog }) => {
  const [size, setSize] = useState("small")

  const toggleSize = (s) => {
    setSize(s)
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
        <p>{blog.likes} <button>Like</button></p>
        <p>{blog.user ? blog.user.name || blog.user.username : null}</p>
      </div>
    )
  }  
}

export default Blog