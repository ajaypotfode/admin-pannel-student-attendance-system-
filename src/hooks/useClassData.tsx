// import React from 'react'

import { useAppDispatch, useAppSelector } from "@/redux/reduxHook"
import { addClass, assignStudentClass, getActiveClasses, getClasses, getClassesReference, getOverviewData, getStudentForClassAssignment, markCompleteClass, setClassData, setClassId, setStudentsId, updateClassData } from "@/redux/slice/classSlice";
import { getClassIdService, setClassIdService, setUpdateClassDataService } from "@/service/localStorageService";
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


    const updateClass = async (data: ClassDataType, reset: () => void) => {
        let formatData
        if (data) {
            const convertedDate = parse(data.time, 'HH:mm', new Date())
            formatData = format(convertedDate, "h:mm a")
            const response = await dispatch(updateClassData({ ...data, time: formatData })).unwrap()
            if (response.success) {
                reset()
                setClassForm(false)
                fetchClass({})
            }
        }
    }


    const handleOpenClassForm = (classData?: ClassDataType) => {
        if (classData?.id) {
            const formatTime = format(parse(classData.time, 'h:mm a', new Date()), "HH:mm")
            setUpdateClassDataService({ ...classData, time: formatTime })
        } else {
            setUpdateClassDataService({ className: '', time: '', trainer: '' })
        }
        setClassForm(true)
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


    const assignClassToStudent = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const response = await dispatch(assignStudentClass(classAssignmentData)).unwrap();
        if (response.success) {
            setClassIdService({ classId: '', variable: 'assignClass' })
        }

    }


    const getAvailableStudents = ({ pageNum, search }: { pageNum?: number, search?: string }) => {
        dispatch(getStudentForClassAssignment({
            pageNum,
            classId: getClassIdService('assignClass') as string,
            search
        }))
    }


    const getAssignClassData = (value: string, name?: string) => {

        if (name === 'classId') {
            dispatch(setClassId({ ...classAssignmentData, classId: value }))
            // getAvailableStudents({ classId: value })
            setClassIdService({ classId: value, variable: 'assignClass' })
            dispatch(getStudentForClassAssignment({ classId: value }))
            dispatch(setStudentsId([]))
        }
        else {
            const alreadySelected = classAssignmentData.studentsId.includes(value)
            const selectedStudents = alreadySelected ?
                classAssignmentData.studentsId.filter(id => id !== value)
                : [...classAssignmentData.studentsId, value]

            dispatch(setStudentsId(selectedStudents))
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
        updateClass,
        handleOpenClassForm,
        loading,
        pages

    }
}

export default UseClassData