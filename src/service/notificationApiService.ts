import type { GetNotificationListResponse, GetNotificationResponse, NotificationData } from "@/types/NotificationType";
import axios from "axios";
// import token from "./tokenService";

export const getNotificationAPI = async (): Promise<GetNotificationListResponse> => {

    try {
        const response = await axios.get<GetNotificationListResponse>(
            `${import.meta.env.VITE_BASE_URL}/notification/get`,
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



export const addNotificationAPI = async (notificationData: NotificationData): Promise<GetNotificationResponse> => {
    const data = JSON.stringify(notificationData)

    try {
        const response = await axios.post<GetNotificationResponse>(
            `${import.meta.env.VITE_BASE_URL}/notification/add`,
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



export const deleteNotificationAPI = async (notificationId: string): Promise<GetNotificationResponse> => {
    const data = JSON.stringify({ notificationId })

    try {
        const response = await axios.delete<GetNotificationResponse>(
            `${import.meta.env.VITE_BASE_URL}/notification/delete`,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': "application/json",
                        // 'Authorization': `Bearer ${token}`
                },
                data
            }
        )
        return response.data
    } catch (error) {
        console.log(error);
        throw error

    }
}