
import { createOrgAPI, getRegistrationStatusAPI, handleOrgRegistrationAPI } from '@/service/orgApiService'
import type { OrgInitialState, OrgRegistrationResponse, RegiStartionDataType } from '@/types/OrgType'
import type { CommonResponse,} from '@/types/QrType'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { AxiosError } from 'axios'
import { format} from 'date-fns'

export const createOrg = createAsyncThunk<CommonResponse, void, { rejectValue: string }>(
    'createOrg',
    async (_, { rejectWithValue }
    ) => {
        try {
            const response = await createOrgAPI()

            if (!response.success) {
                return rejectWithValue(response.message)
            }

            return response
        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            return rejectWithValue(err.response?.data?.message || "Failed To Create Org!!")
        }
    })



export const getRegistrationStatus = createAsyncThunk<OrgRegistrationResponse, void, { rejectValue: string }>(
    'getRegistrationStatus',
    async (_, { rejectWithValue }
    ) => {
        try {
            const response = await getRegistrationStatusAPI()

            return response
        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            return rejectWithValue(err.response?.data?.message || "Failed To Get Org!!")
        }
    })



export const handleRegistration = createAsyncThunk<OrgRegistrationResponse, RegiStartionDataType, { rejectValue: string }>(
    'handleRegistration',
    async (registrationdata, { rejectWithValue }
    ) => {
        try {
            const response = await handleOrgRegistrationAPI(registrationdata)

            return response
        } catch (error) {
            const err = error as AxiosError<{ message: string }>
            return rejectWithValue(err.response?.data?.message || "Failed To Handle Registration!!")
        }
    })





const initialState: OrgInitialState = {
    registrationData: { registration: undefined, date: "", time: "" },
    // allOrg: []
}

const orgSlice = createSlice({
    name: 'org',
    initialState,
    reducers: {
        setRegistrationData: (state, action) => {
            state.registrationData = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            // .addCase(getAllOrg.fulfilled, (state, action) => {
            //     state.allOrg = action.payload.result || []
            // })

            .addCase(getRegistrationStatus.fulfilled, (state, action) => {

                if (action.payload.result) {
                    const date = format(action.payload.result.registrationExpires, 'yyyy-MM-dd');
                    const time = format(action.payload.result.registrationExpires, 'HH:mm');

                    state.registrationData = { registration: action.payload.result.registrationOpen, date, time }
                }
                // state.allOrg = action.payload.result || []
            })
    }
});



export const { setRegistrationData } = orgSlice.actions;
export default orgSlice.reducer