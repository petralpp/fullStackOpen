import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification === null) {
    return null
  }

  return (
    <div id={`notification-${notification.type}`} className="notification-div">
      {notification.message}
    </div>
  )
}

export default Notification
