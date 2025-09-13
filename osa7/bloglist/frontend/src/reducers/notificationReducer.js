import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    changeNotification(state, action) {
      return action.payload
    },
  },
})

export const setNotification = (msg, time) => {
  return async (dispatch) => {
    dispatch(changeNotification(msg))
    setTimeout(() => {
      dispatch(changeNotification(null))
    }, time * 1000)
  }
}

export default notificationSlice.reducer
export const { changeNotification } = notificationSlice.actions
