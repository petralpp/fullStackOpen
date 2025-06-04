const Notification = ( {message, errorMsg} ) => {

    if (message === null) {
        return null
    }

    if (errorMsg) {
        return(
        <div className="error-message">
            <h2>{message}</h2>
        </div>
        )
    }
    
    return(
    <div className="notification">
        <h2>{message}</h2>
    </div>
    );
}

export default Notification;