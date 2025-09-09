import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import storageService from '../services/localStorage'
import { setNotification } from './notificationReducer'

const currentUserReducer = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setCurrentUser(state, action) {
      return action.payload
    },
  },
})

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const userObject = await loginService.login({ username, password })
      if (userObject) {
        storageService.addUser('loggedBlogappUser', userObject)
        blogService.setToken(userObject.token)
        dispatch(setCurrentUser(userObject))
      }
    } catch (exception) {
      dispatch(setNotification({ message: exception.response.data.error, type: 'error' }, 5))
    }
  }
}

export const { setCurrentUser, setAllUsers } = currentUserReducer.actions
export default currentUserReducer.reducer
