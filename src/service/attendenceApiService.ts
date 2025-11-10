import type { AllStudentsParams, AttendenceParams, AttendenceParams1, AttendenceParams2, GetAttendenceListResponse, GetAttendenceResponse, GetAttendenceSummaryResponse, GetClassStudentsResponse, MarkAttendenceParams, MarkAttendenceResponse } from "@/types/AttendenceType";
import axios from "axios";
// import token from "./tokenService";

export const getAttendenceAPI = async (attendanceParams: AttendenceParams): Promise<GetAttendenceResponse> => {
    const params: AttendenceParams = {}

    if (attendanceParams.date?.trim() !== '') params.date = attendanceParams.date
    if (attendanceParams.classId?.trim() !== '') params.classId = attendanceParams.classId
    if (attendanceParams.pageNum) params.pageNum = attendanceParams.pageNum

    try {
        // const response = await axios.request(config)
        const response = await axios.get<GetAttendenceResponse>(
            `${import.meta.env.VITE_BASE_URL}/class/class-attendence`,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    //   'Authorization': `Bearer ${token}`

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


export const getWeeklyAttendenceAPI = async ({ startDate, endDate, classId }: AttendenceParams1): Promise<GetAttendenceListResponse> => {
    const params: AttendenceParams1 = {}

    if (endDate?.trim()) params.endDate = endDate;
    if (startDate?.trim()) params.startDate = startDate;
    if (classId?.trim()) params.classId = classId

    try {
        // const response = await axios.request<GetAttendenceListResponse>(config)
        const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/class/weekly-attendence`,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${token}`
                },
                params,
            })

        return response.data
    } catch (error) {
        console.log(error);
        throw error

    }
}



export const getStudentAttendenceSummaryAPI = async ({ email, pageNum, classId }: AttendenceParams2): Promise<GetAttendenceSummaryResponse> => {
    const params: AttendenceParams2 = {}

    if (email?.trim()) params.email = email;
    if (pageNum) params.pageNum = pageNum;
    if (classId?.trim()) params.classId = classId

    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/student/attendence-summary`,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${token}`
                },
                params,
            })

        return response.data
    } catch (error) {
        console.log(error);
        throw error

    }
}


export const getAllClassStudentsAPI = async ({ classId, pageNum, search }: AllStudentsParams): Promise<GetClassStudentsResponse> => {
    const params: AllStudentsParams = {}
    if (classId?.trim() !== '') params.classId = classId
    if (pageNum) params.pageNum = pageNum
    if (search?.trim() !== '') params.search = search

    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/student/class-students`,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
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


export const MarkAttendenceAPI = async (data: MarkAttendenceParams): Promise<MarkAttendenceResponse> => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/student/mark-attendence`,
            data,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            }

        )
        return response.data
    } catch (error) {
        console.log(error);
        throw error

    }
}