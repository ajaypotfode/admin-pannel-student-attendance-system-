import type { AttendenceParams1, AttendenceParams2, GetAttendenceListResponse, GetAttendenceResponse, GetAttendenceSummaryResponse } from "@/types/AttendenceType";
import axios from "axios";
// import token from "./tokenService";

export const getTodaysAttendenceAPI = async (classId: string): Promise<GetAttendenceResponse> => {

    try {
        // const response = await axios.request(config)
        const response = await axios.get<GetAttendenceResponse>(
            `${import.meta.env.VITE_BASE_URL}/class/todays-attendence?classId=${classId}`,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    //   'Authorization': `Bearer ${token}`

                }
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
