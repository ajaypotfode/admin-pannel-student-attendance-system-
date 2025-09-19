import type { CommonResponse, IsLoginUserResponse, LoginData, LoginResponse, SignupResponse, UserData } from '@/types/AuthType';
import axios from 'axios'

// this is written for my reference

// const api = axios.create({
//     baseURL: 'http://localhost:4000/v1',
//     withCredentials: true,
// });


// const response = await api.post('/add', data)
// const demo = await api.get('/get', { params })


export const createUserAPI = async (userData: UserData): Promise<SignupResponse> => {

    const data = JSON.stringify(userData);

    // const config = {
    //     method: 'post',
    //     maxBodyLength: Infinity,
    //     url: `${import.meta.env.BASE_URL}/auth/add`,
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     data: data
    // };

    try {
        // const response = await axios.request<SignupResponse>(config)
        const response = await axios.post<SignupResponse>(
            `${import.meta.env.VITE_BASE_URL}/auth/add`,
            data,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': "application/json"
                }
            }
        )

        return response.data
    } catch (error) {
        console.log(error);
        throw error

    }
}



export const studentRegistrationAPI = async (userData: UserData): Promise<SignupResponse> => {

    const data = JSON.stringify(userData);

    try {
        // const response = await axios.request<SignupResponse>(config)
        const response = await axios.post<SignupResponse>(
            `${import.meta.env.VITE_BASE_URL}/auth/register-student`,
            data,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': "application/json"
                }
            }
        )

        return response.data
    } catch (error) {
        console.log(error);
        throw error

    }
}



export const loginUserAPI = async (loginData: LoginData): Promise<LoginResponse> => {
    const data = JSON.stringify(loginData);

    try {
        const response = await axios.post<LoginResponse>(
            `${import.meta.env.VITE_BASE_URL}/auth/login`,
            data,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': "application/json"
                }
            }
        )

        return response.data
    } catch (error) {
        console.log(error);
        throw error

    }
}


export const isUserLoginAPI = async (): Promise<IsLoginUserResponse> => {
    try {
        const response = await axios.get<IsLoginUserResponse>(
            `${import.meta.env.VITE_BASE_URL}/auth/status`,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': "application/json"
                }
            },

        )
        return response.data
    } catch (error) {
        console.log(error);
        throw error

    }
}


export const logoutUserAPI = async (): Promise<CommonResponse> => {
    try {
        const response = await axios.post<CommonResponse>(
            `${import.meta.env.VITE_BASE_URL}/auth/logout`,
            {},
            {
                withCredentials: true,
                headers: {
                    'Content-Type': "application/json"
                }
            }
        )
        return response.data

    } catch (error) {
        console.log(error);
        throw error
    }
}


