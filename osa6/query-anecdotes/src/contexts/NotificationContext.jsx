/* eslint-disable react/prop-types */
import { createContext, useContext } from 'react'
import { useReducer } from 'react'

const messageReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
        return `You added '${action.payload}'`
    case "VOTE":
        return `You voted '${action.payload}'`
    case "ERROR":
        return "Too short anecdote, must have length 5 or more"
    case "EMPTY":
        return ""
    default:
        return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [message, messageDispatch] = useReducer(messageReducer, "")
  
  return (
    <NotificationContext.Provider value={[message, messageDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const messageAndDispatch = useContext(NotificationContext)
  return messageAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const messageAndDispatch = useContext(NotificationContext)
  return messageAndDispatch[1]
}

export default NotificationContext