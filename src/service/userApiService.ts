
import type { GetUserListResponse, GetUserResponse, SingleUser, StudentDataParams, StudentResult, TrainerResult, UserParams } from '@/types/UserTypes';
import axios from 'axios'
// import token from './tokenService';



export const getAllStudentsAPI = async ({ pageNum = 1, search = '' }: UserParams): Promise<GetUserListResponse> => {

    try {
        const response = await axios.get<GetUserListResponse>(
            `${import.meta.env.VITE_BASE_URL}/users/all-student?pageNum=${pageNum}&search=${search}`,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': "application/json",
                    // 'Authorization': `Bearer ${token}`
                }
            }
        )
        return response.data
    } catch (error) {
        console.log(error);
        throw error

    }
}



export const getStudentAPI = async ({ email, studentId }: StudentDataParams): Promise<SingleUser<StudentResult>> => {

    const params: StudentDataParams = {}

    if (email?.trim()) params.email = email;
    if (studentId?.trim()) params.studentId = studentId;

    try {
        const response = await axios.get<SingleUser<StudentResult>>(
            `${import.meta.env.VITE_BASE_URL}/users/get-student`,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': "application/json",
                    // 'Authorization': `Bearer ${token}`
                },
                params
            }
        )
        return response.data
    } catch (error) {
        console.log(error);
        throw error

    }
}




export const getAllTrainerAPI = async ({ pageNum = 1, search = '' }: UserParams): Promise<GetUserListResponse> => {

    try {
        const response = await axios.get<GetUserListResponse>(
            `${import.meta.env.VITE_BASE_URL}/users/all-trainer?pageNum=${pageNum}&search=${search}`,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': "application/json",
                    // 'Authorization': `Bearer ${token}`
                }
            }
        )
        return response.data
    } catch (error) {
        console.log(error);
        throw error

    }
}


export const getTrainerAPI = async (trainerId: string): Promise<SingleUser<TrainerResult>> => {

    try {
        const response = await axios.get<SingleUser<TrainerResult>>(
            `${import.meta.env.VITE_BASE_URL}/users/get-tariner/${trainerId}`,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': "application/json",
                    // 'Authorization': `Bearer ${token}`
                }
            }
        )
        return response.data
    } catch (error) {
        console.log(error);
        throw error

    }
}



export const getActiveTrainerAPI = async (search?: string): Promise<GetUserListResponse> => {

    try {
        const response = await axios.get<GetUserListResponse>(
            `${import.meta.env.VITE_BASE_URL}/users/active-trainers?search=${search}`,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': "application/json",
                    // 'Authorization': `Bearer ${token}`
                }
            }
        );

        return response.data
    } catch (error) {
        console.log(error);
        throw error

    }
}



export const getUsersAPI = async (email?: string): Promise<GetUserResponse> => {

    try {
        const response = await axios.get<GetUserResponse>(
            `${import.meta.env.VITE_BASE_URL}/users/get-user?email=${email}`,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': "application/json",
                    // 'Authorization': `Bearer ${token}`
                }
            }
        );

        return response.data
    } catch (error) {
        console.log(error);
        throw error

    }
}



export const changeUserStatusAPI = async (userData: { email: string, status: string, userName: string }): Promise<GetUserResponse> => {
    const data = JSON.stringify(userData)

    try {
        const response = await axios.post<GetUserResponse>(
            `${import.meta.env.VITE_BASE_URL}/users/change-status`,
            data,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': "application/json",
                    // 'Authorization': `Bearer ${token}`
                }
            }
        )
        return response.data
    } catch (error) {
        console.log(error);
        throw error

    }
}