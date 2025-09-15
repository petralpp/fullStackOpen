import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material'

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
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {sortBlogs(allBlogs).map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </TableCell>
                <TableCell>{blog.author}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default BlogList
