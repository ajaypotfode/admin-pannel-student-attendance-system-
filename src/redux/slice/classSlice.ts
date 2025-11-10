
import { addClassesAPI, assignStudentClassAPI, changeClassStatusAPI, getActiveClassesAPI, getClassesAPI, getClassesReferenceAPI, getOverviewDataAPI, getStudentsForClassAssignmentAPI, updateClassesAPI } from '@/service/classApiService'
import type { ClassAssignmentDataType, ClassDataType, ClassInitialState, ClassParams, GetClassListResponse, GetClassResponse, GetOverviewResponse, GetSAssignClassResponse } from '@/types/ClassTyps'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { AxiosError } from 'axios'

export const getClasses = createAsyncThunk<GetClassListResponse, ClassParams, { rejectValue: string }>(
    'getClasses',
    async (data, { rejectWithValue }
    ) => {
        try {
            const response = await getClassesAPI(data)
            return response
        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            return rejectWithValue(err.response?.data?.message || "Failed To get Classes!!")
        }
    })



export const getClassesReference = createAsyncThunk<GetClassListResponse, string | undefined, { rejectValue: string }>(
    'getClassesReference',
    async (search, { rejectWithValue }
    ) => {
        try {
            const response = await getClassesReferenceAPI(search)
            return response
        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            return rejectWithValue(err.response?.data?.message || "Failed To get Classes!!")
        }
    })



export const getActiveClasses = createAsyncThunk<GetClassListResponse, string | undefined, { rejectValue: string }>(
    'getActiveClasses',
    async (search, { rejectWithValue }
    ) => {
        try {
            const response = await getActiveClassesAPI(search)
            return response
        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            return rejectWithValue(err.response?.data?.message || "Failed To Fetch Active Class!!")
        }
    })



export const addClass = createAsyncThunk<GetClassResponse, ClassDataType, { rejectValue: string }>(
    'addClass',
    async (classData, { rejectWithValue }
    ) => {
        try {
            const response = await addClassesAPI(classData);

            if (!response.success) {
                return rejectWithValue(response.message)
            }

            return response
        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            return rejectWithValue(err.response?.data?.message || "Failed To Add Class!!")
        }
    })



export const updateClassData = createAsyncThunk<GetClassResponse, ClassDataType, { rejectValue: string }>(
    'updateClassData',
    async (classData, { rejectWithValue }
    ) => {
        try {
            const response = await updateClassesAPI(classData);

            if (!response.success) {
                return rejectWithValue(response.message)
            }

            return response
        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            return rejectWithValue(err.response?.data?.message || "Failed To Update Class!!")
        }
    })



export const markCompleteClass = createAsyncThunk<GetClassResponse, string, { rejectValue: string }>(
    'markCompleteClass',
    async (classId, { rejectWithValue }
    ) => {
        try {
            const response = await changeClassStatusAPI(classId);

            if (!response.success) {
                return rejectWithValue(response.message)
            }

            return response
        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            return rejectWithValue(err.response?.data?.message || "Failed To Change Status!!")
        }
    })



export const getOverviewData = createAsyncThunk<GetOverviewResponse, void, { rejectValue: string }>(
    'getOverviewdata',
    async (_, { rejectWithValue }
    ) => {
        try {
            const response = await getOverviewDataAPI()
            return response
        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            return rejectWithValue(err.response?.data?.message || "Failed To Fetch Overview Data!!")
        }
    })



export const assignStudentClass = createAsyncThunk<GetSAssignClassResponse, ClassAssignmentDataType, { rejectValue: string }>(
    'assignStudentClass',
    async (classData, { rejectWithValue }
    ) => {
        try {
            const response = await assignStudentClassAPI(classData);

            if (!response.success) {
                return rejectWithValue(response.message)
            }

            return response
        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            return rejectWithValue(err.response?.data?.message || "Failed To Assign Class!!")
        }
    })


export const getStudentForClassAssignment = createAsyncThunk<GetSAssignClassResponse, ClassParams, { rejectValue: string }>(
    'getStudentForClassAssignment',
    async (classData, { rejectWithValue }
    ) => {
        try {
            const response = await getStudentsForClassAssignmentAPI(classData)

            if (!response.success) {
                return rejectWithValue(response.message)
            }

            return response
        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            return rejectWithValue(err.response?.data?.message || "Failed To get Available User!!")
        }
    })




const initialState: ClassInitialState = {
    allClasses: [],
    activeClasses: [],
    classData: { className: "", trainer: '', time: '' },
    overviewdata: [],
    classAssignmentData: { classId: "", studentsId: [] },
    availableStudents: null
    // assignClassData: { studentId: "", classId: "" }

}

const classSlice = createSlice({
    name: 'classes',
    initialState,
    reducers: {
        setClassData: (state, action) => {
            state.classData = action.payload
        },
        setClassId: (state, action) => {
            state.classAssignmentData = action.payload
        },
        setStudentsId: (state, action) => {
            state.classAssignmentData = {
                ...state.classAssignmentData,
                studentsId: action.payload
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getClasses.fulfilled, (state, action) => {
                state.allClasses = action.payload?.result || []
            })
            .addCase(getClassesReference.fulfilled, (state, action) => {
                state.allClasses = action.payload?.result || []
            })
            .addCase(getActiveClasses.fulfilled, (state, action) => {
                state.activeClasses = action.payload?.result || []
            })
            .addCase(addClass.fulfilled, (state) => {
                state.classData = { className: "", trainer: "", time: "" }
                // if (action.payload?.result) {
                //     state.allClasses.push(action.payload.result)
                // }
            })
            .addCase(updateClassData.fulfilled, (state) => {
                state.classData = { id: '', className: "", trainer: "", time: "" }
                // if (action.payload?.result) {
                //     state.allClasses.push(action.payload.result)
                // }
            })
            .addCase(getOverviewData.fulfilled, (state, action) => {
                state.overviewdata = action.payload?.result || []
            })
            .addCase(assignStudentClass.fulfilled, (state, action) => {
                const filterAvailableStudent =
                    state.availableStudents?.filter(
                        student => !action.payload.result?.some(s => s._id === student._id)
                    )

                state.availableStudents = filterAvailableStudent as []
                state.classAssignmentData = { studentsId: [], classId: "" }
            })
            .addCase(getStudentForClassAssignment.fulfilled, (state, action) => {
                state.availableStudents = action.payload.result || []
            })
        // .addCase
        // .addCase(markCompleteClass.fulfilled, (state, action) => {
        //     // state.allClasses.forEach((classData) => {
        //     //     if (classData._id === action.payload.result?._id) {
        //     //         classData.status = 'complete'
        //     //     }
        //     // })
        // })
    }
});





export const { setClassData, setClassId, setStudentsId } = classSlice.actions;
export default classSlice.reducer