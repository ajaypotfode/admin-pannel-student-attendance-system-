// import React from 'react'

import { useAppDispatch, useAppSelector } from "@/redux/reduxHook"
import { addClass, assignStudentClass, getActiveClasses, getClasses, getClassesReference, getOverviewData, getStudentForClassAssignment, markCompleteClass, setClassData, setClassId, setStudentsId } from "@/redux/slice/classSlice";
import type { ClassDataType } from "@/types/ClassTyps";
import { format, parse } from "date-fns";
import { useState } from "react";


const UseClassData = () => {
    const { overviewdata, allClasses, activeClasses, classAssignmentData, availableStudents, classData } = useAppSelector(state => state.classes);
    const { loading, pages } = useAppSelector(state => state.common)
    const dispatch = useAppDispatch();
    const [classForm, setClassForm] = useState(false);


    // useEffect(() => {
    //     console.log("class ID In UseEffect  :", classAssignmentData);

    // }, [])

    const generateNewClass = async (data: ClassDataType, reset: () => void) => {
        let formatData
        if (data) {
            const convertedDate = parse(data.time, 'HH:mm', new Date())
            formatData = format(convertedDate, "h:mm a")
            const response = await dispatch(addClass({ ...data, time: formatData })).unwrap()
            if (response.success) {
                reset()
                setClassForm(false)
                fetchClass({})
            }
        }
    }


    const getClassData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        // console.log("Date Value is :", value);

        dispatch(setClassData({ ...classData, [name]: value }))
    }

    const getOrganozationOverview = () => {
        dispatch(getOverviewData())
    }

    const fetchClass = ({ search, pageNum }: { search?: string, pageNum?: number }) => {
        dispatch(getClasses({ search, pageNum }))
    }


    const fetchClassReference = ({ search }: { search?: string }) => {
        dispatch(getClassesReference(search))
    }


    const fetchActiveClass = ({ search }: { search?: string }) => {
        dispatch(getActiveClasses(search))
    }


    const assignClassToStudent = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        dispatch(assignStudentClass(classAssignmentData))

    }

 
    const getAvailableStudents = ({ pageNum }: { pageNum?: number }) => {
        dispatch(getStudentForClassAssignment({ pageNum }))
    }


    const getAssignClassData = (value: string, name?: string) => {

        if (name === 'classId') {
            dispatch(setClassId({ ...classAssignmentData, classId: value }))
            // getAvailableStudents({ classId: value })
            dispatch(getStudentForClassAssignment({ classId: value }))
        }
        else {
            dispatch(setStudentsId(value))

        }
    }


    const markClassAsComplete = async (classId: string) => {
        const response = await dispatch(markCompleteClass(classId)).unwrap();
        if (response.success) {
            fetchClass({})
        }
    }

  

    return {
        generateNewClass,
        getClassData,
        classData,
        getOrganozationOverview,
        overviewdata,
        fetchClass,
        fetchClassReference,
        allClasses,
        fetchActiveClass,
        activeClasses,
        getAssignClassData,
        getAvailableStudents,
        // getStudentsIds,
        classAssignmentData,
        assignClassToStudent,
        // fetchStudentsForClassAssignment,
        availableStudents,
        markClassAsComplete,
        classForm,
        setClassForm,
        loading,
        pages

    }
}

export default UseClassData