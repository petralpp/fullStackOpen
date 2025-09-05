import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(_state, action) {
      return action.payload
    },
  },
})

export const initStore = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const savedBlog = await blogService.create(blog)
    dispatch(addBlog(savedBlog))
  }
}

export const { addBlog, setBlogs } = blogSlice.actions
export default blogSlice.reducer
