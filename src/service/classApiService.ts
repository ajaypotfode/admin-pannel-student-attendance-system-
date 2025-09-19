import type { ClassAssignmentDataType, ClassDataType, ClassParams, GetClassListResponse, GetClassResponse, GetOverviewResponse, GetSAssignClassResponse } from "@/types/ClassTyps";
import axios from "axios";
// import token from "./tokenService";

export const getClassesAPI = async ({ search, pageNum = 1 }: ClassParams): Promise<GetClassListResponse> => {
    const params: { search?: string, pageNum?: number } = {}

    if (search?.trim()) params.search = search;
    if (pageNum) params.pageNum = pageNum;

    try {
        const response = await axios.get<GetClassListResponse>(
            `${import.meta.env.VITE_BASE_URL}/class/get`,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': "application/json",
                    // 'Authorization': `Bearer ${token}`
                },
                params
            }
        )
        // console.log("classes Response Is :", response.data);

        return response.data

    } catch (error) {
        console.log(error);
        throw error

    }
}


export const getClassesReferenceAPI = async (search?: string): Promise<GetClassListResponse> => {
    const params: { search?: string } = {}

    if (search?.trim()) params.search = search;

    try {
        const response = await axios.get<GetClassListResponse>(
            `${import.meta.env.VITE_BASE_URL}/class/get-reference`,
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



export const getActiveClassesAPI = async (search?: string): Promise<GetClassListResponse> => {
    const params: { search?: string } = {}

    if (search?.trim()) params.search = search

    try {
        const response = await axios.get<GetClassListResponse>(
            `${import.meta.env.VITE_BASE_URL}/class/active-class`,
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


export const addClassesAPI = async (classData: ClassDataType): Promise<GetClassResponse> => {
    const data = JSON.stringify(classData)

    try {
        const response = await axios.post<GetClassResponse>(
            `${import.meta.env.VITE_BASE_URL}/class/add-class`,
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


export const changeClassStatusAPI = async (classId: string): Promise<GetClassResponse> => {
    const data = JSON.stringify({ classId })

    try {
        const response = await axios.post<GetClassResponse>(
            `${import.meta.env.VITE_BASE_URL}/class/mark-complete`,
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



export const getOverviewDataAPI = async (): Promise<GetOverviewResponse> => {

    try {
        const response = await axios.get<GetOverviewResponse>(
            `${import.meta.env.VITE_BASE_URL}/class/overview`,
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




export const assignStudentClassAPI = async (studentData: ClassAssignmentDataType): Promise<GetSAssignClassResponse> => {

    const data = JSON.stringify(studentData)

    try {
        const response = await axios.post<GetSAssignClassResponse>(
            `${import.meta.env.VITE_BASE_URL}/student/add-class`,
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



export const getStudentsForClassAssignmentAPI = async ({ search, classId, pageNum = 1 }: ClassParams): Promise<GetSAssignClassResponse> => {
    const params: ClassParams = {}

    if (search?.trim()) params.search = search;
    if (classId?.trim()) params.classId = classId;
    if (pageNum) params.pageNum = pageNum

    try {
        const response = await axios.get<GetSAssignClassResponse>(
            `${import.meta.env.VITE_BASE_URL}/student/available-students`,
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


