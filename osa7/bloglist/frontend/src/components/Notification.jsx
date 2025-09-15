import { useSelector } from 'react-redux'
import { Alert } from '@mui/material'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification === null) {
    return null
  }

  return (
    <div className="notification-div">
      <Alert severity={notification.type}>{notification.message}</Alert>
    </div>
  )
}

export default Notification
