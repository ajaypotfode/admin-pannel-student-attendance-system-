import { useAppDispatch, useAppSelector } from "@/redux/reduxHook"
// import { setCurrentClass } from "@/redux/slice/commonSlice";
import { closeClass, handleAttendenceSummary, qrVerify, setCurrentQrClass } from "@/redux/slice/qrSlice";
import { getClassIdService, setClassIdService } from "@/service/localStorageService";


const UseQrData = () => {
    const dispatch = useAppDispatch();
    const { studentData, attendence, currentQrClass } = useAppSelector(state => state.qr)
    const { loading, error } = useAppSelector(state => state.common)

    // const getClassDetails = (classData: { className: string, time: string }) => {
    //     dispatch(setClassDetails(classData))
    // }

    const getQrVerify = (qrdata: string) => {
        dispatch(qrVerify({ qrdata, classId: getClassIdService('qrClassId') }))
    }

    const addAttendenceSummary = async (classId: string) => {
        const response = await dispatch(handleAttendenceSummary(classId)).unwrap()
        if (response.success) {
            dispatch(setCurrentQrClass(classId))
            setClassIdService({ classId: classId, variable: 'qrClassId' })
        }
        // dispatch(setCurrentClass({ classId, page }))
    }

    const handleCloseClass = async () => {
        const response = await dispatch(closeClass(getClassIdService('qrClassId'))).unwrap();
        if (response.success) {
            setClassIdService({ classId: '', variable: 'qrClassId' })
        }
    }

    // const handleCloseClass

    return {
        studentData,
        attendence,
        getQrVerify,
        addAttendenceSummary,
        loading,
        error,
        currentQrClass,
        handleCloseClass
        // getClassDetails
    }
}

export default UseQrData