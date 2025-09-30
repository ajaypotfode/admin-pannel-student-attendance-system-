import type { CommonResponse, QrVerifyResponse } from "@/types/QrType";
import axios from "axios";
// import token from "./tokenService";

export const verifyQrAPI = async (qrVerifydata:{qrdata:string,classId:string}): Promise<QrVerifyResponse> => {
    const data = JSON.stringify(qrVerifydata)

    try {
        const response = await axios.post<QrVerifyResponse>(
            `${import.meta.env.VITE_BASE_URL}/qr/verify-qr`,
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


export const addAttendenceSummaryAPI = async (classId: string): Promise<CommonResponse> => {
    const data = JSON.stringify({ classId })

    try {
        const response = await axios.post<CommonResponse>(
            `${import.meta.env.VITE_BASE_URL}/qr/add-summary`,
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