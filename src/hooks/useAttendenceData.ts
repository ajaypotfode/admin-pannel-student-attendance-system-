import { useAppDispatch, useAppSelector } from "@/redux/reduxHook"
import { getAttendenceSummary, getTodaysAttendence, getWeeklyAttendence, setAttendenceHistoryParams, setCurrentAttendenceClass, setSummaryParams } from "@/redux/slice/attendenceSlice"
// import { setCurrentClass } from "@/redux/slice/commonSlice";
// import type { AttendenceParams1, AttendenceParams2 } from "@/types/AttendenceType"
import { format } from 'date-fns'
import { toast } from "react-toastify";

const UseAttendenceData = () => {
    const { attendenceSummary, todaysAttendence, weekAttendence, summaryParams, attendenceHistoryParams, currentAttendenceClass } = useAppSelector(state => state.attendance);
    const { loading, error } = useAppSelector(state => state.common)
    const dispatch = useAppDispatch()


    const fetchTodaysAttendence = (classId: string) => {
        dispatch(setCurrentAttendenceClass(classId))
        // dispatch(setCurrentClass({ classId, page }))
        dispatch(getTodaysAttendence(classId))
    }



    const fetchWeeklyAttendence = (value: string, name: string) => {
        // const { name, value } = e.target

        // dispatch(setSummaryParams({ ...summaryParams, [name]: value }));
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

    // const fetchWeeklyAttendence = (e: React.MouseEvent<HTMLButtonElement>) => {
    //     e.preventDefault()
    //     // console.log(summaryParams);

    //     dispatch(getWeeklyAttendence(summaryParams))
    // }


    const fetchStudentAttendenceSummary = ({pageNum}:{pageNum?:number}) => {

        dispatch(getAttendenceSummary({ ...attendenceHistoryParams,pageNum }))
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


    return {
        attendenceSummary,
        todaysAttendence,
        weekAttendence,
        fetchTodaysAttendence,
        fetchWeeklyAttendence,
        fetchStudentAttendenceSummary,
        currentAttendenceClass,
        loading,
        error,
        // getClassId,
        handleDateRange,
        summaryParams,
        getAttendenceHistoryParams,
        attendenceHistoryParams,
    }
}

export default UseAttendenceData