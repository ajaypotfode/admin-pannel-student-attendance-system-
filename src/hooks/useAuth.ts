import { useAppDispatch, useAppSelector } from "@/redux/reduxHook"
import { adminVerifyToken, loginUser, logoutUser, signupUser, studentRegistration, uploadImage } from "@/redux/slice/authSlice"
import { type LoginFormType, type RegisterFormType } from '../schema/authFormSchema'
import { toast } from "react-toastify"
import { useRef } from "react"
import { setClassIdService, setUpdateClassDataService } from "@/service/localStorageService"
import { useNavigate } from "react-router-dom"
// import { Route } from "react-router-dom"
// import type { UseFormReturn } from "react-hook-form"

const UseAuth = () => {

    const { user, verifyAdminToken, image } = useAppSelector(state => state.auth)
    const { loading } = useAppSelector(state => state.common)
    const imageRef: React.RefObject<HTMLInputElement | null> = useRef(null)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const getUserLogin = async (data: LoginFormType, reset: () => void) => {
        const response = await dispatch(loginUser(data)).unwrap();

        if (response.success) {
            reset()
            window.location.href = '/'
            setClassIdService({});
            setUpdateClassDataService({});
            // localStorage.setItem('token', JSON.stringify(response.token))
        }
    }


    const getAdminTokenVerify = async (adminToken: string, reset: () => void) => {
        const response = await dispatch(adminVerifyToken(adminToken)).unwrap()
        if (response?.success) {
            reset()
        }

    }


    const getUserRegister = async (data: RegisterFormType, reset: () => void, role: string, token: string | null) => {
        // const response = await dispatch(signupUser({ ...data, role})).unwrap();

        // "/image.jpg" is sending only For Testing Purpose.
        if (!image) return

        let response
        if (role !== 'student') {
            response = await dispatch(signupUser({ ...data, role, adminToken: token, image: image })).unwrap();
        }
        else response = await dispatch(studentRegistration({ ...data, role, adminToken: null, image: image })).unwrap();


        if (response?.success) {
            reset()
            if (imageRef.current) {
                imageRef.current.value = ""
            }
            if (role === 'admin') navigate('auth/login');
            toast.success(`${role} Register SuccessFully!!!`)
        }

    }


    // const getStudentRegister = async (data: RegisterFormType, reset: () => void) => {
    //     const response = await dispatch(signupUser({ ...data, role: 'student' })).unwrap();

    //     if (response.success) {
    //         reset()
    //         toast.success("Student Register SuccessFully!!")
    //     }
    // }


    const getUserLogout = async () => {
        const response = await dispatch(logoutUser()).unwrap();

        if (response.success) {
            window.location.href = '/auth/login'
        }
    }

    const handleImageUpload = (imageFile: File) => {
        dispatch(uploadImage(imageFile))
    }

    return {
        getUserLogin,
        getUserLogout,
        getUserRegister,
        imageRef,
        user,
        getAdminTokenVerify,
        verifyAdminToken,
        loading,
        handleImageUpload
        // getStudentRegister
    }
}

export default UseAuth