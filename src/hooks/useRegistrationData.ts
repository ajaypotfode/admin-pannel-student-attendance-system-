import { useAppDispatch, useAppSelector } from "@/redux/reduxHook"
import { getRegistrationStatus, handleRegistration, setRegistrationData } from "@/redux/slice/orgSlice"
import { toast } from "react-toastify";

const UseRegistrationData = () => {
    const dispatch = useAppDispatch()
    const { registrationData } = useAppSelector(state => state.org);
    const { loading } = useAppSelector(state => state.common)

    const fetchRegistrationStatus = () => {
        dispatch(getRegistrationStatus())
    }

    const getRegistrationData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        dispatch(setRegistrationData({ ...registrationData, [name]: value }))
    }

    const setRegistrationValue = (value: string) => {
        const registration = value === "true" ? true : false
        dispatch(setRegistrationData({ ...registrationData, registration }))
    }

    const handleRegistrationStatus = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const response = await dispatch(handleRegistration(registrationData)).unwrap();

        if (response.success) {
            toast.success(`${response.message}`)
        }
    }

    return {
        fetchRegistrationStatus,
        getRegistrationData,
        handleRegistrationStatus,
        registrationData,
        setRegistrationValue,
        loading
    }
}

export default UseRegistrationData