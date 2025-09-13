import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <div id="nav-bar">
      <Link to="/">Blogs</Link>
      <Link to="/users">Users</Link>
    </div>
  )
}

export default Navigation
