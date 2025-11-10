
import { getAllClassStudentsAPI, getStudentAttendenceSummaryAPI, getAttendenceAPI, getWeeklyAttendenceAPI, MarkAttendenceAPI } from '@/service/attendenceApiService'
import type { AllStudentsParams, AttendenceInitialState, AttendenceParams, AttendenceParams1, AttendenceParams2, GetAttendenceListResponse, GetAttendenceResponse, GetAttendenceSummaryResponse, GetClassStudentsResponse, MarkAttendenceParams, MarkAttendenceResponse } from '@/types/AttendenceType'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { AxiosError } from 'axios'

// export const getTodaysAttendence = createAsyncThunk<GetAttendenceResponse, string, { rejectValue: string }>(
//     'getTodaysAttendence',
//     async (classId, { rejectWithValue }
//     ) => {
//         try {
//             const response = await getAttendenceAPI(classId)

//             if (!response.success) {
//                 return rejectWithValue(response.message)
//             }

//             return response
//         } catch (error) {
//             const err = error as AxiosError<{ message: string }>
//             return rejectWithValue(err.response?.data?.message || "Failed To get Classes!!")
//         }
//     })


export const getAttendence = createAsyncThunk<GetAttendenceResponse, AttendenceParams, { rejectValue: string }>(
    'getAttendence',
    async (attendenceParams, { rejectWithValue }
    ) => {
        try {
            const response = await getAttendenceAPI(attendenceParams)

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


export const getAllClassStudents = createAsyncThunk<GetClassStudentsResponse, AllStudentsParams, { rejectValue: string }>(
    'getAllClassStudents',
    async (data, { rejectWithValue }
    ) => {
        try {
            const response = await getAllClassStudentsAPI(data)

            if (!response.success) {
                return rejectWithValue(response.message)
            }

            return response
        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            return rejectWithValue(err.response?.data?.message || "Failed To Fetch Class Students!!")
        }
    })

export const markAttendence = createAsyncThunk<MarkAttendenceResponse, MarkAttendenceParams, { rejectValue: string }>(
    'markAttendence',
    async (data, { rejectWithValue }
    ) => {
        try {
            const response = await MarkAttendenceAPI(data)

            if (!response.success) {
                return rejectWithValue(response.message)
            }

            return response
        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            return rejectWithValue(err.response?.data?.message || "Failed To Add Attendence!!")
        }
    })


const initialState: AttendenceInitialState = {
    attendenceSummary: null,
    todaysAttendence: null,
    attendanceData: { attendendStudents: [], totalAttendence: null },
    weekAttendence: [],
    // currentAttendenceClass: null,
    attendenceParams: { classId: "", date: "todays", customeDate: '' },
    summaryParams: { endDate: '', startDate: '' },
    attendenceHistoryParams: { email: "", classId: "" },
    allClassStudents: null,
    dataForMarkAttendence: { classId: '', studentIds: [] }

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
        // setCurrentAttendenceClass: (state, action) => {
        //     state.currentAttendenceClass = action.payload
        // },
        setClassId: (state, action) => {
            state.dataForMarkAttendence = action.payload
        },
        setStudentsId: (state, action) => {
            state.dataForMarkAttendence = {
                ...state.dataForMarkAttendence,
                studentIds: action.payload
            }
        },
        setAttendenceParams: (state, action) => {
            state.attendenceParams = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            // .addCase(getTodaysAttendence.fulfilled, (state, action) => {
            //     state.todaysAttendence = action.payload.result || null
            // })
            .addCase(getAttendence.fulfilled, (state, action) => {
                state.attendanceData = {
                    attendendStudents: action.payload.result?.attendendStudents || [],
                    totalAttendence: action.payload.result?.totalAttendence || null
                }
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
            .addCase(getAllClassStudents.fulfilled, (state, action) => {
                state.allClassStudents = action.payload.result || []
            })
            .addCase(markAttendence.fulfilled, (state) => {
                // state.allClassStudents = action.payload.result || []
                state.dataForMarkAttendence = { ...state.dataForMarkAttendence, studentIds: [] }
            })
            .addCase(markAttendence.rejected, (state) => {
                // state.allClassStudents = action.payload.result || []
                state.dataForMarkAttendence = { ...state.dataForMarkAttendence, studentIds: [] }
            })
    }
});



export const { setSummaryParams, setAttendenceHistoryParams, setClassId, setStudentsId, setAttendenceParams } = attendenceSlice.actions;
export default attendenceSlice.reducer