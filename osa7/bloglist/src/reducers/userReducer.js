import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import storageService from '../services/localStorage'
import { setNotification } from './notificationReducer'

const userReducer = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
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
        dispatch(setUser(userObject))
      }
    } catch (exception) {
      dispatch(setNotification({ message: exception.response.data.error, type: 'error' }, 5))
    }
  }
}

export const { setUser } = userReducer.actions
export default userReducer.reducer
