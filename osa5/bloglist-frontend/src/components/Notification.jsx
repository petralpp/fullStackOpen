const Notification = ({ message }) => {
      
    if (message === null) {
        return null
    }
  
    return (
        <div id={`notification-${message.type}`} className="notification-div">
            {message.message}
        </div>
    )
}

export default Notification