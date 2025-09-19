
import { Card,CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import type { StudentResult } from "@/types/UserTypes"
import type React from "react"

interface ProfileCardProps {
    user: StudentResult | null
}

const StudentProfileCard: React.FC<ProfileCardProps> = ({ user }) => {

    return (
        <Card className="flex-1 h-full bg-gray-900 border border-gray-500 text-white overflow-y-auto scrollbar-hidden">
            <CardHeader className="flex justify-center flex-col items-center">

                <div className="smallsc1:h-52 xl:h-40 h-32 smallsc1:w-52 xl:w-40 w-32 border border-red-500 rounded-full"></div>

                <CardTitle className="smallsc1:text-2xl xl:text-xl text-lg ">{user?.userName}</CardTitle>
                <CardDescription>
                    {user?.role}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 font-bold  smallsc1:text-md xl:text-sm text-[12px]  ">
                <div className="flex   px-5 gap-2  py-2 rounded-xl bg-gray-800 border border-gray-600  ">
                    <span className="text-white">Email :-</span>
                    <span className="font-medium text-gray-300">{user?.email}</span>
                </div>
                <div className="flex  px-5 gap-2 py-2 rounded-xl bg-gray-800 border border-gray-600">
                    <span className="text-white">Contact No :-</span>
                    <span className="font-medium text-gray-300">{user?.contactNo}</span>
                </div>
                <div className="flex  px-5 gap-2 py-2 flex-col">
                    <span>Classes</span>
                    <div className="w-full flex flex-col gap-4">
                        {
                            user?.studentClass?.map((stdClass, index) => (
                                <div className="flex flex-col justify-between px-4  rounded-xl bg-gray-800 border border-gray-600 " key={index} >
                                    <div className="flex gap-4 justify-between w-full">
                                        <span id="subject" className='p-3 text-gray-500'>Class Name</span>
                                        <span id="subject" className='p-3'>{stdClass.classId.className}</span>
                                    </div>
                                    <div className="flex gap-4 justify-between w-full">
                                        <span id="subject" className='p-3 text-gray-500'>Class Time</span>
                                        <span id="subject" className='p-3'>{stdClass.classId.time}</span>
                                    </div>
                                    <div className="flex gap-4 justify-between w-full">
                                        <span id="subject" className='p-3 text-gray-500'>Total Class</span>
                                        <span id="subject" className='p-3'>{stdClass.totalClass}</span>
                                    </div>
                                    <div className="flex gap-4 justify-between w-full">
                                        <span id="subject" className='p-3 text-gray-500'>Class Attendend</span>
                                        <span id="subject" className='p-3 text-green-700 '>{stdClass.attendence}</span>
                                    </div>
                                    <div className="flex gap-4 justify-between w-full">
                                        <span id="subject" className='p-3 text-gray-500'>Class Absented</span>
                                        <span id="subject" className='p-3 text-red-700'>{stdClass.absence}</span>
                                    </div>
                                    {/* <span id="subject" className='p-3'>{stdClass.classId.className}</span>
                                    <span id="subject" className='p-3'>{stdClass.classId.time}</span> */}
                                </div>
                            ))
                        }

                    </div>
    
                </div>
            </CardContent>
        </Card>
    )
}



export default StudentProfileCard