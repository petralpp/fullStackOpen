import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const usersReducer = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
    setUserBlog(state, action) {
      return state.map((user) => {
        if (user.id !== action.payload.id) {
          return user
        } else {
          return { ...user, blogs: user.blogs.concat(action.payload.blog) }
        }
      })
    },
    removeUserBlog(state, action) {
      return state.map((user) => {
        if (user.id !== action.payload.userId) {
          return user
        } else {
          return { ...user, blogs: user.blogs.filter((blog) => blog.id !== action.payload.blogId) }
        }
      })
    },
  },
})

export const initUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getUsers()
    dispatch(setUsers(users))
  }
}

export const { setUsers, setUserBlog, removeUserBlog } = usersReducer.actions
export default usersReducer.reducer
