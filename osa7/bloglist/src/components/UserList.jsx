import { useSelector } from 'react-redux'
import User from './User'

const UserList = () => {
  const users = useSelector((state) => state.allUsers)

  if (!users) {
    return []
  }

  return (
    <table>
      <thead>
        <tr>
          <th>User</th>
          <th>Blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <User key={user.id} user={user} />
        ))}
      </tbody>
    </table>
  )
}

export default UserList
