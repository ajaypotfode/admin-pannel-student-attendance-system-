import { useAppDispatch, useAppSelector } from '@/redux/reduxHook'
import React from 'react'
// import UseCommonData from './useCommonData';
import { changeUserStatus, getActiveTrainers, getAllStudents, getAllTrainers, getStudent, getTrainer, getUser, setUserData, setUserStatus } from '@/redux/slice/userSlice';
import { toast } from 'react-toastify';

const UseUserData = () => {
    const { allTrainers, allStudents, trainer, activeTrainer, student, userData, user } = useAppSelector(state => state.user)
    const { loading, pages } = useAppSelector(state => state.common)
    const dispatch = useAppDispatch();


    const fetchAllStudents = ({ search, pageNum }: { search?: string, pageNum?: number }) => {
        dispatch(getAllStudents({ search, pageNum }))
    }

    const fetchStudent = (email?: string, studentId?: string) => {
        dispatch(getStudent({ email, studentId }))
    }

    const fetchAllTrainers = ({ search, pageNum }: { search?: string, pageNum?: number }) => {
        dispatch(getAllTrainers({ search, pageNum }))
    }

    const fetchActiveTrainers = (search?: string) => {
        dispatch(getActiveTrainers(search))
    }

    const fetchTrainer = (trainerId: string) => {
        dispatch(getTrainer(trainerId))
    }


    const getUserData = (value: string) => {
        dispatch(setUserData(value))
    }

    const fetchUser = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        dispatch(getUser(userData))
    }

    const getUserStatus = (value: string) => {
        dispatch(setUserStatus({ ...user, status: value }))
    }

    const getChangeUserStatus = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (user) {
            const response = await dispatch(changeUserStatus(
                { email: user?.email, userName: user?.userName, status: user?.status }
            )).unwrap()

            if (response.success) {
                toast.success(`${response.message}`)
            }
            return
        }
        toast.error("Choose User First!!")
    }


    return {
        allTrainers,
        allStudents,
        pages,
        trainer,
        activeTrainer,
        student,
        // userData,
        // search,
        // debouncing,
        fetchAllStudents,
        fetchStudent,
        fetchAllTrainers,
        fetchActiveTrainers,
        fetchTrainer,
        getUserData,
        fetchUser,
        getUserStatus,
        getChangeUserStatus,
        user,
        userData,
        loading
        // getChangeUserStatus,
        // getStudentData
    }
}

export default UseUserData