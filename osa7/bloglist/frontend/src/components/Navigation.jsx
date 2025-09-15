import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppBar, Toolbar, Button, Box } from '@mui/material'

const Navigation = ({ handleLogout }) => {
  const user = useSelector((state) => state.user)

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          Blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          Users
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <p>{user.name ? user.name : user.username} logged in</p>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navigation
