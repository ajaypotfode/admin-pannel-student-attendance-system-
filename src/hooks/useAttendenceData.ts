import { useAppDispatch, useAppSelector } from "@/redux/reduxHook"
import { getAllClassStudents, getAttendenceSummary, getAttendence, getWeeklyAttendence, markAttendence, setAttendenceHistoryParams, setClassId, setStudentsId, setSummaryParams, setAttendenceParams } from "@/redux/slice/attendenceSlice"
import { handleAttendenceSummary } from "@/redux/slice/qrSlice";
import { getClassIdService, setClassIdService } from "@/service/localStorageService";
// import { setCurrentClass } from "@/redux/slice/commonSlice";
// import type { AttendenceParams1, AttendenceParams2 } from "@/types/AttendenceType"
import { format } from 'date-fns'
import { toast } from "react-toastify";

const UseAttendenceData = () => {
    const { attendenceSummary,
        todaysAttendence,
        weekAttendence,
        summaryParams,
        attendenceParams,
        attendanceData,
        attendenceHistoryParams,
        // currentAttendenceClass,
        dataForMarkAttendence,
        allClassStudents } = useAppSelector(state => state.attendance);
    const { loading, error, pages } = useAppSelector(state => state.common)
    const dispatch = useAppDispatch()


    const fetchAttendence = ({ pageNum }: { pageNum?: number }) => {
if (!attendenceParams.classId) {
            toast.error(`Please Add Class Id `)
            return
        }
        if (attendenceParams.customeDate === '' && attendenceParams.date === 'customeDate') {
            toast.error(`Please Add Date`)
            return
        }

        dispatch(getAttendence({
            classId: attendenceParams.classId,
            date: attendenceParams.customeDate ? attendenceParams.customeDate : attendenceParams.date,
            pageNum: pageNum
        }))

    }

    const getAttendenceParams = (value: string, name?: string) => {
        if (name === 'classId') {
            dispatch(setAttendenceParams({ ...attendenceParams, classId: value }))
        } else if (name === 'customeDate') {
            dispatch(setAttendenceParams({ ...attendenceParams, customeDate: value }))
        } else {
            dispatch(setAttendenceParams({ ...attendenceParams, date: value, customeDate: '' }))
            // console.log("today or yesterday  :", value);
        }
        // dispatch(setAttendenceParams({ ...updatedparams }))
    }



    const fetchWeeklyAttendence = (value: string, name: string) => {
        dispatch(getWeeklyAttendence({ ...summaryParams, [name]: value }))
    }


    const handleDateRange = (value: string) => {

        const start = new Date(value)
        const end = new Date(start)

        end.setDate(start.getDate() + 6)

        const endDate = format(end, 'yyyy-MM-dd');
        const startDate = format(start, 'yyyy-MM-dd')
        dispatch(setSummaryParams({ ...summaryParams, endDate, startDate }))
    }


    const fetchStudentAttendenceSummary = ({ pageNum }: { pageNum?: number }) => {

        dispatch(getAttendenceSummary({ ...attendenceHistoryParams, pageNum }))
    }

    // const fetchAtte


    const getAttendenceHistoryParams = (value: string, name: string,) => {
        if (name === 'classId') {
            if (!attendenceHistoryParams.email) {
                toast.error('please Mention Student Email !!');
                return
            }
            dispatch(getAttendenceSummary({ ...attendenceHistoryParams, [name]: value }))
        }

        dispatch(setAttendenceHistoryParams({ ...attendenceHistoryParams, [name]: value }))
    }


    const fetchAllClassStudents = ({ search, pageNum }: { search?: string, pageNum?: number }) => {
        dispatch(getAllClassStudents({
            classId: getClassIdService('markAttendence') as string,
            pageNum: pageNum,
            search
        }))
    }


    const getDataForAttendence = (value: string, name?: string) => {
        if (name === 'classId') {
            dispatch(setClassId({ ...dataForMarkAttendence, classId: value }))
            // getAvailableStudents({ classId: value })
            setClassIdService({ classId: value, variable: 'markAttendence' })
            dispatch(handleAttendenceSummary(value))
            dispatch(getAllClassStudents({ classId: value }))
            dispatch(setStudentsId([]))

        }
        else {
            const alreadySelected = dataForMarkAttendence.studentIds.includes(value)

            const selectedStudents = alreadySelected ?
                dataForMarkAttendence.studentIds.filter(id => id !== value)
                : [...dataForMarkAttendence.studentIds, value]

            dispatch(setStudentsId(selectedStudents))

        }
    }

    const markStudentAttendence = async () => {
        const response = await dispatch(markAttendence(dataForMarkAttendence)).unwrap();
        if (response.success) {
            setClassIdService({ classId: '', variable: 'markAttendence' })
            setClassIdService({ classId: '', variable: 'qrClassId' })
        }
    }

    return {
        attendenceSummary,
        todaysAttendence,
        weekAttendence,
        fetchAttendence,
        fetchWeeklyAttendence,
        fetchStudentAttendenceSummary,
        getAttendenceParams,
        attendenceParams,
        attendanceData,
        loading,
        error,
        pages,
        // getClassId,
        handleDateRange,
        summaryParams,
        getAttendenceHistoryParams,
        attendenceHistoryParams,
        fetchAllClassStudents,
        getDataForAttendence,
        allClassStudents,
        dataForMarkAttendence,
        markStudentAttendence


    }
}

export default UseAttendenceData