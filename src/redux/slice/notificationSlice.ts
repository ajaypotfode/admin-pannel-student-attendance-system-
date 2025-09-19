
import { addNotificationAPI, deleteNotificationAPI, getNotificationAPI } from '@/service/notificationApiService'
import type { GetNotificationListResponse, GetNotificationResponse, NotificationData, NotificationInitialState } from '@/types/NotificationType'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { AxiosError } from 'axios'

export const getNotifications = createAsyncThunk<GetNotificationListResponse, void, { rejectValue: string }>(
    'getNotification',
    async (_, { rejectWithValue }
    ) => {
        try {
            const response = await getNotificationAPI()
            return response
        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            return rejectWithValue(err.response?.data?.message || "Failed To get Notitfications!!")
        }
    })


export const addNotifications = createAsyncThunk<GetNotificationResponse, NotificationData, { rejectValue: string }>(
    'addNotification',
    async (data, { rejectWithValue }
    ) => {
        try {
            const response = await addNotificationAPI(data)
            return response
        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            return rejectWithValue(err.response?.data?.message || "Failed To add Notification!!")
        }
    })


export const deleteNotifications = createAsyncThunk<GetNotificationResponse, string, { rejectValue: string }>(
    'deleteNotification',
    async (notificationId, { rejectWithValue }
    ) => {
        try {
            const response = await deleteNotificationAPI(notificationId)
            return response
        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            return rejectWithValue(err.response?.data?.message || "Failed To get Classes!!")
        }
    })


const initialState: NotificationInitialState = {
    notifications: [],
    // notificationData: { heading: "", details: "" }
}


const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        // getNotificationData: (state, action) => {
        //     state.notificationData = action.payload
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getNotifications.fulfilled, (state, action) => {
                state.notifications = action.payload?.result || []
            })
            .addCase(addNotifications.fulfilled, (state, action) => {
                if (action.payload.result) {
                    state.notifications.push(action.payload.result)
                }
                // state.notificationData = { heading: "", details: "" }
            })
            .addCase(deleteNotifications.fulfilled, (state, action) => {
                const data = state.notifications.filter((notification) => notification._id !== action.payload.result?._id)
                state.notifications = data
            })
    }
});



// export const { getNotificationData } = notificationSlice.actions;
export default notificationSlice.reducer