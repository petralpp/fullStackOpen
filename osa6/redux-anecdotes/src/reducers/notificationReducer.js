import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        changeNotification(state, action) {
            return action.payload
        }
    }
})

export const setNotification = (msg, time) => {
    return async (dispatch) => {
        dispatch(changeNotification(msg))
        setTimeout(() => {
            dispatch(changeNotification(''))
        }, time*1000)
    }
}

export default notificationSlice.reducer
export const { changeNotification } = notificationSlice.actions