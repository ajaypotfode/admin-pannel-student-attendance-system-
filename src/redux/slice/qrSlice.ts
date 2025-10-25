
import { addAttendenceSummaryAPI, verifyQrAPI } from '@/service/qrApiService'
import type { CommonResponse, QrInitialState, QrVerifyResponse } from '@/types/QrType'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { AxiosError } from 'axios'

export const qrVerify = createAsyncThunk<QrVerifyResponse, { qrdata: string, classId: string }, { rejectValue: string }>(
    'qrVerify',
    async (verifyQrData, { rejectWithValue }
    ) => {
        try {
            const response = await verifyQrAPI(verifyQrData)

            if (!response.success) {
                return rejectWithValue(response.message)
            }

            return response
        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            return rejectWithValue(err.response?.data?.message || "Failed To Scan QR!!")
        }
    })



export const handleAttendenceSummary = createAsyncThunk<CommonResponse, string, { rejectValue: string }>(
    'handleAttendenceSummary',
    async (classId, { rejectWithValue }
    ) => {
        try {
            const response = await addAttendenceSummaryAPI(classId)

            if (!response.success) {
                return rejectWithValue(response.message)
            }

            return response
        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            return rejectWithValue(err.response?.data?.message || "Failed To Add Attendence Summary!!")
        }
    })



const initialState: QrInitialState = {
    studentData: null,
    attendence: null,
    currentQrClass: ''
    // currentClass: null
    // openQr: false


}

const qrSlice = createSlice({
    name: 'qr',
    initialState,
    reducers: {
        setCurrentQrClass: (state, action) => {
            state.currentQrClass = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(qrVerify.fulfilled, (state, action) => {
                state.studentData = action.payload?.students || null
                state.attendence = action.payload?.attendence || null
            })

    }
});



export const { setCurrentQrClass } = qrSlice.actions;
export default qrSlice.reducer