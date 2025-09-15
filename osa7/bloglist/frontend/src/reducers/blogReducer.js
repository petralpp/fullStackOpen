import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setUserBlog, removeUserBlog } from './usersReducer'
import { setNotification } from './notificationReducer'

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
    changeBlog(state, action) {
      return state.map((b) => {
        if (b.id !== action.payload.id) {
          return b
        } else {
          return action.payload
        }
      })
    },
    removeBlog(state, action) {
      return state.filter((b) => b.id !== action.payload)
    },
  },
})

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const savedBlog = await blogService.create(blog)
      dispatch(addBlog(savedBlog))
      dispatch(setUserBlog({ id: savedBlog.user.id, blog: savedBlog }))
      dispatch(setNotification({ message: `A new blog ${blog.title} by ${blog.author} added`, type: 'success' }, 5))
    } catch (exception) {
      dispatch(setNotification({ message: exception.response.data.error, type: 'error' }, 5))
    }
  }
}

export const voteBlog = (blog) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update(blog)
      dispatch(changeBlog(updatedBlog))
    } catch (exception) {
      dispatch(setNotification({ message: exception.response.data.error, type: 'error' }, 5))
    }
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog.id)
      dispatch(removeBlog(blog.id))
      dispatch(removeUserBlog({ userId: blog.user.id, blogId: blog.id }))
      dispatch(setNotification({ message: `Blog ${blog.title} removed`, type: 'success' }, 5))
    } catch (exception) {
      dispatch(setNotification({ message: exception.response.data.error, type: 'error' }, 5))
    }
  }
}

export const commentBlog = (id, comment) => {
  return async (dispatch) => {
    try {
      const newComment = await blogService.comment(id, comment)
      dispatch(changeBlog(newComment))
    } catch (exception) {
      dispatch(setNotification({ message: exception.response.data.error, type: 'error' }, 5))
    }
  }
}

export const { addBlog, setBlogs, changeBlog, removeBlog } = blogSlice.actions
export default blogSlice.reducer
