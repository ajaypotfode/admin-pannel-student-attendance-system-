import { useAppDispatch, useAppSelector } from "@/redux/reduxHook"
// import { setCurrentClass } from "@/redux/slice/commonSlice";
import { handleAttendenceSummary, qrVerify, setCurrentQrClass } from "@/redux/slice/qrSlice";


const UseQrData = () => {
    const dispatch = useAppDispatch();
    const { studentData, attendence, currentQrClass } = useAppSelector(state => state.qr)
    const { loading, error } = useAppSelector(state => state.common)

    // const getClassDetails = (classData: { className: string, time: string }) => {
    //     dispatch(setClassDetails(classData))
    // }

    const getQrVerify = (qrData: string) => {
        dispatch(qrVerify(qrData))
    }

    const addAttendenceSummary = (classId: string) => {
        dispatch(handleAttendenceSummary(classId))
        dispatch(setCurrentQrClass(classId))
        // dispatch(setCurrentClass({ classId, page }))
    }

    return {
        studentData,
        attendence,
        getQrVerify,
        addAttendenceSummary,
        loading,
        error,
        currentQrClass
        // getClassDetails
    }
}

export default UseQrData