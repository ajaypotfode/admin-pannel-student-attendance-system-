import { adminTokenVerifyAPI, createUserAPI, isUserLoginAPI, loginUserAPI, logoutUserAPI, studentRegistrationAPI } from '@/service/authApiService'
import type { AdminTokenVerifyResponse, CommonResponse, InitialStateType, IsLoginUserResponse, LoginData, LoginResponse, SignupResponse, UserData } from '@/types/AuthType'
import { uploadImageService } from '../../firebase/uploadImageService'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { AxiosError } from 'axios'

export const loginUser = createAsyncThunk<LoginResponse, LoginData, { rejectValue: string }>('loginUser', async (loginData, { rejectWithValue }) => {
    try {
        const response = await loginUserAPI(loginData)
        return response
    } catch (error) {
        const err = error as AxiosError<{ message: string }>
        return rejectWithValue(err.response?.data?.message || "Failed To Login User!!")
    }
})


export const signupUser = createAsyncThunk<SignupResponse, UserData, { rejectValue: string }>("signupUser", async (signupData, { rejectWithValue }) => {
    try {
        const response = await createUserAPI(signupData)
        if (!response.success) {
            return rejectWithValue(response.message)
        }
        return response
    } catch (error) {
        const err = error as AxiosError<{ message: string }>
        return rejectWithValue(err.response?.data?.message || "failed To Create User")
    }
})


export const logoutUser = createAsyncThunk<CommonResponse, void, { rejectValue: string }>('logoutUser', async (_, { rejectWithValue }) => {
    try {
        const response = await logoutUserAPI()
        return response
    } catch (error) {
        const err = error as AxiosError<{ message: string }>
        return rejectWithValue(err.response?.data?.message || "Failed To Logout User!!")
    }
})


export const isLoginUser = createAsyncThunk<IsLoginUserResponse, void, { rejectValue: string }>('isLoginUser', async (_, { rejectWithValue }) => {
    try {
        const response = await isUserLoginAPI()

        return response
    } catch (error) {
        const err = error as AxiosError<{ message: string }>
        return rejectWithValue(err.response?.data?.message || "Failed To get User login or not!!")
    }
})


export const studentRegistration = createAsyncThunk<SignupResponse, UserData, { rejectValue: string }>("studentRegister", async (signupData, { rejectWithValue }) => {
    try {
        const response = await studentRegistrationAPI(signupData)
        if (!response.success) {
            return rejectWithValue(response.message)
        }
        return response
    } catch (error) {
        const err = error as AxiosError<{ message: string }>
        return rejectWithValue(err.response?.data?.message || "failed To Create Student")
    }
})


export const uploadImage = createAsyncThunk<string, File, { rejectValue: string }>("uploadImage", async (imageFile, { rejectWithValue }) => {
    try {
        const response = await uploadImageService(imageFile)
        return response
    } catch (error) {
        const err = error as AxiosError<{ message: string }>
        return rejectWithValue(err.response?.data?.message || "failed To Upload Image")
    }
})


export const adminVerifyToken = createAsyncThunk<AdminTokenVerifyResponse, string, { rejectValue: string }>("adminVerifyToken", async (adminToken, { rejectWithValue }) => {
    try {
        const response = await adminTokenVerifyAPI(adminToken)
        return response
    } catch (error) {
        const err = error as AxiosError<{ message: string }>
        return rejectWithValue(err.response?.data?.message || "Access Denied, Unauthorized To Registeration")
    }
})


const initialState: InitialStateType = {
    isUserLogin: undefined,
    user: null,
    isUserLoading: true,
    verifyAdminToken: null,
    image: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // .addCase(loginUser.pending, (state) => {
            //     state.isUserLoading = true
            // })
            // .addCase(loginUser.fulfilled, (state, action) => {
            //     if (action.payload.result?.role === 'admin' && action.payload.result?.status === 'active') {
            //         state.isUserLogin = true
            //     }
            //     state.isUserLoading = false

            // })
            // .addCase(loginUser.rejected, (state) => {
            //     state.isUserLogin = false;
            //     state.isUserLoading = false
            //     state.user = null;
            //     // state.isAuthLoading = false;
            // })
            .addCase(signupUser.fulfilled, (state) => {
                state.image = null
            })
            .addCase(adminVerifyToken.fulfilled, (state, action) => {
                state.verifyAdminToken = action.payload.token
            })
            .addCase(adminVerifyToken.rejected, (state) => {
                state.verifyAdminToken = null
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isUserLogin = false
                state.isUserLoading = false
                state.user = null
            })
            .addCase(isLoginUser.pending, (state) => {
                state.isUserLoading = true
            })
            .addCase(isLoginUser.fulfilled, (state, action) => {
                if (action.payload.result?.role === 'admin' && action.payload.result?.status === 'active') {
                    state.isUserLogin = true
                }
                state.isUserLoading = false

                state.user = action.payload.result || null
            })
            .addCase(isLoginUser.rejected, (state) => {
                state.isUserLogin = false;
                state.isUserLoading = false
                state.user = null;
                // state.isAuthLoading = false;
            })
            .addCase(uploadImage.fulfilled, (state, action) => {
                state.image = action.payload;
            })

    }
});
// export const { /*getSignUpData, getLoginData*/ } = authSlice.actions;
export default authSlice.reducer