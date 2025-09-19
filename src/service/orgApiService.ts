import type { CommonResponse, OrgRegistrationResponse, RegiStartionDataType } from "@/types/OrgType";
import axios from "axios";
// import token from "./tokenService";

export const createOrgAPI = async (): Promise<CommonResponse> => {
    // const data = JSON.stringify({ orgName });

    try {
        const response = await axios.post<CommonResponse>(
            `${import.meta.env.VITE_BASE_URL}/org/create-org`,
            // data,
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




export const getRegistrationStatusAPI = async (): Promise<OrgRegistrationResponse> => {
    // const data = JSON.stringify({ orgName });

    try {
        const response = await axios.get<OrgRegistrationResponse>(
            `${import.meta.env.VITE_BASE_URL}/org/registration-status`,
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



export const handleOrgRegistrationAPI = async (registrationdata: RegiStartionDataType): Promise<OrgRegistrationResponse> => {
    const data = JSON.stringify(registrationdata);

    try {
        const response = await axios.post<OrgRegistrationResponse>(
            `${import.meta.env.VITE_BASE_URL}/org/handle-registration`,
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