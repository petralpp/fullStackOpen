import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, TableBody, TableHead, TableCell, TableContainer, TableRow, Paper } from '@mui/material'

const UserList = () => {
  const users = useSelector((state) => state.allUsers)

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Blogs created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </TableCell>
              <TableCell>{user.blogs?.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default UserList
