
import { getStudentAttendenceSummaryAPI, getTodaysAttendenceAPI, getWeeklyAttendenceAPI } from '@/service/attendenceApiService'
import type { AttendenceInitialState, AttendenceParams1, AttendenceParams2, GetAttendenceListResponse, GetAttendenceResponse, GetAttendenceSummaryResponse } from '@/types/AttendenceType'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { AxiosError } from 'axios'

export const getTodaysAttendence = createAsyncThunk<GetAttendenceResponse, string, { rejectValue: string }>(
    'getTodaysAttendence',
    async (classId, { rejectWithValue }
    ) => {
        try {
            const response = await getTodaysAttendenceAPI(classId)

            if (!response.success) {
                return rejectWithValue(response.message)
            }

            return response
        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            return rejectWithValue(err.response?.data?.message || "Failed To get Classes!!")
        }
    })


export const getWeeklyAttendence = createAsyncThunk<GetAttendenceListResponse, AttendenceParams1, { rejectValue: string }>(
    'getWeeklyAttendence',
    async (data, { rejectWithValue }
    ) => {
        try {
            const response = await getWeeklyAttendenceAPI(data);

            if (!response.success) {
                return rejectWithValue(response.message)
            }

            return response
        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            return rejectWithValue(err.response?.data?.message || "Failed To Fetch Active Class!!")
        }
    })



export const getAttendenceSummary = createAsyncThunk<GetAttendenceSummaryResponse, AttendenceParams2, { rejectValue: string }>(
    'getAttendenceSummary',
    async (data, { rejectWithValue }
    ) => {
        try {
            const response = await getStudentAttendenceSummaryAPI(data)

            if (!response.success) {
                return rejectWithValue(response.message)
            }

            return response
        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            return rejectWithValue(err.response?.data?.message || "Failed To Add Class!!")
        }
    })


const initialState: AttendenceInitialState = {
    attendenceSummary: null,
    todaysAttendence: null,
    weekAttendence: [],
    currentAttendenceClass: null,
    summaryParams: { endDate: '', startDate: '' },
    attendenceHistoryParams: { email: "", classId: "" }

}

const attendenceSlice = createSlice({
    name: 'attendence',
    initialState,
    reducers: {
        setSummaryParams: (state, action) => {
            state.summaryParams = action.payload
        },
        setAttendenceHistoryParams: (state, action) => {
            state.attendenceHistoryParams = action.payload
        },
        setCurrentAttendenceClass: (state, action) => {
            state.currentAttendenceClass = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTodaysAttendence.fulfilled, (state, action) => {
                state.todaysAttendence = action.payload.result || null
            })
            .addCase(getWeeklyAttendence.fulfilled, (state, action) => {
                state.weekAttendence = action.payload.result || []
                state.summaryParams = { endDate: '', startDate: '' }
            })
            .addCase(getWeeklyAttendence.rejected, (state) => {
                state.weekAttendence = []
                state.summaryParams = { ...state.summaryParams, endDate: '', startDate: '' }
            })
            .addCase(getAttendenceSummary.fulfilled, (state, action) => {
                state.attendenceSummary = action.payload.result || null
            })
            .addCase(getAttendenceSummary.rejected, (state) => {
                state.attendenceSummary = null
            })
    }
});



export const { setSummaryParams, setAttendenceHistoryParams, setCurrentAttendenceClass } = attendenceSlice.actions;
export default attendenceSlice.reducer