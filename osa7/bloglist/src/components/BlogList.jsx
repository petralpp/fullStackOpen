import { Link } from 'react-router-dom'
import Blog from './Blog'
import { useSelector } from 'react-redux'

const BlogList = () => {
  const allBlogs = useSelector((state) => state.blogs)

  const sortBlogs = (blogs) => {
    const sortedBlogs = blogs.toSorted((a, b) => {
      if (a.likes > b.likes) {
        return -1
      } else if (b.likes > a.likes) {
        return 1
      } else {
        return 0
      }
    })
    return sortedBlogs
  }

  return (
    <div>
      {sortBlogs(allBlogs).map((blog) => (
        <div key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} by {blog.author}
          </Link>
        </div>
      ))}
    </div>
  )
}

export default BlogList
