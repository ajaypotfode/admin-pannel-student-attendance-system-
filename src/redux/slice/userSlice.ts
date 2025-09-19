import { changeUserStatusAPI, getActiveTrainerAPI, getAllStudentsAPI, getAllTrainerAPI, getStudentAPI, getTrainerAPI, getUsersAPI } from "@/service/userApiService";
import type { GetUserListResponse, GetUserResponse, SingleUser, StudentDataParams, StudentResult, TrainerResult, UserInitialState, UserParams } from "@/types/UserTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";

export const getAllStudents = createAsyncThunk<GetUserListResponse, UserParams, { rejectValue: string }>("getAllStudents", async (data, { rejectWithValue }) => {
    try {
        const students = await getAllStudentsAPI(data)
        return students
    } catch (error) {
        const err = error as AxiosError<{ message: string }>
        return rejectWithValue(err.response?.data.message || "failed To fetch Students")
    }
})



export const getStudent = createAsyncThunk<SingleUser<StudentResult>, StudentDataParams, { rejectValue: string }>("getStudent", async (data, { rejectWithValue }) => {
    try {
        const student = await getStudentAPI(data)

        if (!student.success) {
            return rejectWithValue(student.message)
        }

        return student
    } catch (error) {
        const err = error as AxiosError<{ message: string }>
        return rejectWithValue(err.response?.data.message || "failed To fetch Student")
    }
})



export const getAllTrainers = createAsyncThunk<GetUserListResponse, UserParams, { rejectValue: string }>("getAllTrainers", async (data, { rejectWithValue }) => {
    try {
        const trainers = await getAllTrainerAPI(data)
        return trainers
    } catch (error) {
        const err = error as AxiosError<{ message: string }>
        return rejectWithValue(err.response?.data.message || "failed To fetch Trainers")
    }
})


export const getActiveTrainers = createAsyncThunk<GetUserListResponse, string | undefined, { rejectValue: string }>("getActiveTrainers", async (search, { rejectWithValue }) => {
    try {
        const trainers = await getActiveTrainerAPI(search)
        return trainers
    } catch (error) {
        const err = error as AxiosError<{ message: string }>
        return rejectWithValue(err.response?.data.message || "failed To fetch Trainers")
    }
})



export const getTrainer = createAsyncThunk<SingleUser<TrainerResult>, string, { rejectValue: string }>("getTrainer", async (trainerId, { rejectWithValue }) => {
    try {
        const trainer = await getTrainerAPI(trainerId)

        if (!trainer.success) {
            return rejectWithValue(trainer.message)
        }

        return trainer
    } catch (error) {
        const err = error as AxiosError<{ message: string }>
        return rejectWithValue(err.response?.data.message || "failed To fetch Trainer")
    }
})


export const getUser = createAsyncThunk<GetUserResponse, string, { rejectValue: string }>("getuser", async (userData, { rejectWithValue }) => {
    try {
        const user = await getUsersAPI(userData)

        if (!user.success) {
            return rejectWithValue(user.message)
        }

        return user
    } catch (error) {
        const err = error as AxiosError<{ message: string }>
        return rejectWithValue(err.response?.data.message || "failed To fetch User")
    }
})



export const changeUserStatus = createAsyncThunk<GetUserResponse, { email: string, status: string, userName: string }, { rejectValue: string }>(
    "changeUserStatus", async (userData, { rejectWithValue }) => {

        try {
            const response = await changeUserStatusAPI(userData);

            if (!response.success) {
                return rejectWithValue(response.message)
            }

            return response
        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            return rejectWithValue(err.response?.data.message || "failed To fetch Trainers")
        }
    })




const initialState: UserInitialState = {
    allTrainers: [],
    allStudents: [],
    // pages: null,
    trainer: null,
    activeTrainer: [],
    student: null,
    userData: "",
    user: null
}


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload
        },
        setUserStatus: (state, action) => {
            state.user = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllTrainers.fulfilled, (state, action) => {
                state.allTrainers = action.payload?.result || []
                // state.pages = action.payload?.pages || null
            })
            // .addCase(getAllTrainers.pending, (state) => {
            //     // state.pages = { pageNum: 0, totalPages: 0 }
            // })
            .addCase(getAllStudents.fulfilled, (state, action) => {
                state.allStudents = action.payload?.result || [];
                // state.pages = action.payload.pages || null;
            })
            // .addCase(getAllStudents.pending, (state) => {
            //     // state.pages = { pageNum: 0, totalPages: 0 }
            // })
            .addCase(getActiveTrainers.fulfilled, (state, action) => {
                state.activeTrainer = action.payload?.result || []
            })
            .addCase(getTrainer.fulfilled, (state, action) => {
                state.trainer = action.payload?.result || null
            })
            .addCase(getStudent.fulfilled, (state, action) => {
                state.student = action.payload?.result || null
            })
            .addCase(changeUserStatus.fulfilled, (state, action) => {
                const { email, role, status, userName } = action.payload.result
                state.user = { email, role, status, userName }

            })
            .addCase(getUser.fulfilled, (state, action) => {
                const { email, role, status, userName } = action.payload.result
                state.user = { email, role, status, userName }
            })
    }
})


export const { setUserData, setUserStatus } = userSlice.actions

export default userSlice.reducer