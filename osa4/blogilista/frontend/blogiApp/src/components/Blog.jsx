const Blog = ({ blog, removeBlog }) => {

  return(
    <tr>
        <td>{blog.title}</td><td>{blog.author}</td><td>{blog.likes}</td>
        <td><button onClick={() => removeBlog(blog.id)}>Delete</button></td>
    </tr>
  )
}

export default Blog