import { ClassCard } from '@/components/ClassCard';
// import ProfileCard from '@/components/ProfileCard';
import QrScanner from '@/components/QrScanner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import UseQrData from '@/hooks/useQrData';
import UseClassData from '@/hooks/useClassData';
import { useEffect } from 'react';
import { CardsSkeleton, ProfileCardSkeleton } from '@/components/Spinner';
// import React from 'react'


const MarkAttendence = () => {
    const { studentData, getQrVerify, addAttendenceSummary, currentQrClass } = UseQrData();
    const { fetchActiveClass, activeClasses, loading } = UseClassData();

    useEffect(() => {
        fetchActiveClass({})
    }, [])

    return (
        <div className='w-full h-full overflow-y-auto scrollbar-hidden'>
            <h1 className="smallsc1:text-4xl text-2xl text-white font-bold ml-6 mt-4">Mark Attendence</h1>
            <div className="flex justify-start space-x-6 items-center smallsc1:p-7 p-5 w-full  overflow-hidden">
                <div className='flex justify-start space-x-6 items-center px-7 w-full overflow-x-auto scrollbar-hidden  '>
                    {loading['getActiveClasses'] ? (<CardsSkeleton />)
                        : (activeClasses.map((cls, idx) => (
                            <ClassCard
                                key={idx}
                                className={cls.className}
                                trainer={cls.trainer.userName}
                                classId={cls._id}
                                time={cls.time}
                                onclick={() => addAttendenceSummary(cls._id)}
                                currentClass={currentQrClass}
                            />
                        )))}
                </div>
            </div>

            <div className="w-full smallsc1:p-11 p-9 flex flex-1 h-full gap-4 ">
                <div className="  smallsc1:p-7 p-5 rounded-2xl bg-gray-900 flex min-w-[300px] min-h-[400px] flex-col items-center text-white h-fit">
                    {currentQrClass &&
                        <QrScanner onScan={getQrVerify} />
                    }
                </div>

                {/* profile Card */}
                <div className="h-fit  smallsc1:p-7 p-5 rounded-2xl bg-gray-900 flex flex-1 justify-center min-h-[75%] ">
                    {/* <AttendenceDetailsCard /> */}
                    {
                        loading['qrVerify'] ? <ProfileCardSkeleton />
                            : (
                                <Card className="flex-1 flex flex-row h-fit justify-center gap-x-12 items-start bg-gray-900 border border-gray-500 text-white overflow-y-auto scrollbar-hidden">
                                    <CardHeader className="flex justify-center flex-col items-center w-[40%]">

                                        <div className="smallsc1:h-52 xl:h-40 h-32 smallsc1:w-52 xl:w-40 w-32 border border-red-500 rounded-full"></div>

                                        <CardTitle className="smallsc1:text-2xl xl:text-xl text-lg flex ">
                                            <p className='text-[10px] text-gray-500'>MR./MS.</p>
                                            {studentData?.studentId.username}
                                        </CardTitle>
                                        <CardDescription>
                                            {studentData?.studentId.role}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-5 font-bold flex-1  smallsc1:text-md xl:text-sm text-[12px]  ">
                                        <div className="flex smallsc1:px-5 px-3 gap-2  py-2 rounded-xl bg-gray-800 border border-gray-600">
                                            <span className="text-white">Email :-</span>
                                            <span className="font-medium text-gray-300">{studentData?.studentId.email}</span>
                                        </div>
                                        <div className="flex  smallsc1:px-5 px-3 gap-2 py-2 rounded-xl bg-gray-800 border border-gray-600">
                                            <span className="text-white">Contact No :-</span>
                                            <span className="font-medium text-gray-300">{studentData?.studentId.contactNo}</span>
                                        </div>
                                        <div className="flex  smallsc1:px-5 px-3 gap-2 py-2 flex-col">
                                            <span>Classes</span>
                                            <div className="w-full flex flex-col gap-4">
                                                <div className="flex flex-col justify-between px-4  rounded-xl bg-gray-800 border border-gray-600 ">
                                                    <div className="flex gap-4 justify-between w-full">
                                                        <span id="subject" className='p-3 text-gray-500'>Class Name</span>
                                                        <span id="subject" className='p-3'>{studentData?.classId.className}</span>
                                                    </div>
                                                    <div className="flex gap-4 justify-between w-full">
                                                        <span id="subject" className='p-3 text-gray-500'>Class Time</span>
                                                        <span id="subject" className='p-3'>{studentData?.classId.time}</span>
                                                    </div>
                                                    <div className="flex gap-4 justify-between w-full">
                                                        <span id="subject" className='p-3 text-gray-500'>Total Class</span>
                                                        <span id="subject" className='p-3'>{studentData?.totalClass}</span>
                                                    </div>
                                                    <div className="flex gap-4 justify-between w-full">
                                                        <span id="subject" className='p-3 text-gray-500'>Class Attendend</span>
                                                        <span id="subject" className='p-3 text-green-700 '>{studentData?.attendence}</span>
                                                    </div>
                                                    <div className="flex gap-4 justify-between w-full">
                                                        <span id="subject" className='p-3 text-gray-500'>Class Absented</span>
                                                        <span id="subject" className='p-3 text-red-700'>{studentData?.absence}</span>
                                                    </div>
                                                    {/* <span id="subject" className='p-3'>{stdClass.classId.className}</span>
                                    <span id="subject" className='p-3'>{stdClass.classId.time}</span> */}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>

                                </Card>
                            )
                    }
                    {/* <ProfileCardSkeleton /> */}
                    {/* <Card className="flex-1 flex flex-row h-fit justify-center gap-x-12 items-start bg-gray-900 border border-gray-500 text-white overflow-y-auto scrollbar-hidden">
                        <CardHeader className="flex justify-center flex-col items-center w-[40%]">

                            <div className="smallsc1:h-52 xl:h-40 h-32 smallsc1:w-52 xl:w-40 w-32 border border-red-500 rounded-full"></div>

                            <CardTitle className="smallsc1:text-2xl xl:text-xl text-lg ">Mr.Anil Gawade</CardTitle>
                            <CardDescription>
                                Trainer
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-5 font-bold flex-1  smallsc1:text-md xl:text-sm text-[12px]  ">
                            <div className="flex smallsc1:px-5 px-3 gap-2  py-2 rounded-xl bg-gray-800 border border-gray-600">
                                <span className="text-white">Email :-</span>
                                <span className="font-medium text-gray-300">anil@gmail.com</span>
                            </div>
                            <div className="flex  smallsc1:px-5 px-3 gap-2 py-2 rounded-xl bg-gray-800 border border-gray-600">
                                <span className="text-white">Contact No :-</span>
                                <span className="font-medium text-gray-300">1234567890</span>
                            </div>
                            <div className="flex  smallsc1:px-5 px-3 gap-2 py-2 flex-col">
                                <span>Classes</span>
                                <div className="w-full flex flex-col gap-4">
                                    <div className="flex gap-4 justify-between px-4  rounded-xl bg-gray-800 border border-gray-600 ">
                                        <span id="subject" className='p-3'>javascript</span>
                                        <span id="subject" className='p-3'>12:30</span>
                                    </div>
                                    <div className="flex gap-4 justify-between px-4  rounded-xl bg-gray-800 border border-gray-600 ">
                                        <span id="subject" className='p-3'>javascript</span>
                                        <span id="subject" className='p-3'>12:30</span>
                                    </div>
                                    <div className="flex gap-4 justify-between px-4  rounded-xl bg-gray-800 border border-gray-600 ">
                                        <span id="subject" className='p-3'>javascript</span>
                                        <span id="subject" className='p-3'>12:30</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>

                    </Card> */}
                </div>
            </div>
        </div>
    )
}

export default MarkAttendence