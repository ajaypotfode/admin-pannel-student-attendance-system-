import { ClassCard } from '@/components/ClassCard';
import { CardsSkeleton, Spinner } from '@/components/Spinner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import UseAttendenceData from '@/hooks/useAttendenceData';
import UseClassData from '@/hooks/useClassData';
import { format } from 'date-fns';
import { useEffect } from 'react'


const ViewAttendence = () => {

    const { fetchActiveClass, activeClasses, } = UseClassData();
    const { todaysAttendence, fetchTodaysAttendence, currentAttendenceClass, loading } = UseAttendenceData()
    // const {}=

    useEffect(() => {
        fetchActiveClass({});
    }, [])

    return (
        <div className='w-full h-screen overflow-y-auto scrollbar-hidden'>
            <h1 className="smallsc1:text-4xl text-2xl text-white font-bold ml-6 mt-4">Todays Attendence</h1>
            <div className="flex justify-start space-x-6 items-center smallsc1:p-7 p-5 w-full  overflow-hidden">
                <div className='flex justify-start space-x-6 items-center px-7 w-full overflow-x-auto scrollbar-hidden  '>
                    {/* {activeClasses && activeClasses.map((cls, idx) => (
                        <ClassCard
                            key={idx}
                            className={cls.className}
                            trainer={cls.trainer.userName}
                            classId={cls._id}
                            time={cls.time}
                            onclick={() => fetchTodaysAttendence(cls._id)}
                            currentClass={currentAttendenceClass}
                        />
                    ))} */}
                    {loading['getActiveClasses'] ? (<CardsSkeleton />)
                        : (
                            activeClasses.map((cls, idx) => (
                                <ClassCard
                                    key={idx}
                                    className={cls.className}
                                    trainer={cls.trainer.userName}
                                    classId={cls._id}
                                    time={cls.time}
                                    onclick={() => fetchTodaysAttendence(cls._id)}
                                    currentClass={currentAttendenceClass}
                                />
                            ))
                        )}
                </div>
            </div>
            <div className=' h-fit p-7 w-full'>
                <Card className="w-full  pb-12  mx-auto shadow-md h-full bg-[#111827] border border-[#1F2937] text-white">
                    <CardHeader>
                        {/* <CardTitle className="text-2xl font-bold">Attendance Overview</CardTitle> */}
                        <CardTitle className="xl:text-xl text-md text-gray-300 bg-gray-800 border border-gray-600 w-fit  px-4 py-2 rounded-xl">{format(new Date(), 'EEEE dd MMM yyyy')}</CardTitle >
                    </CardHeader>
                    <CardContent className="flex gap-6 text-center justify-center">
                        <div className=' bg-gray-800 border border-gray-600  px-4 py-2 rounded-xl flex flex-col gap-5 pb-5 w-[30%]'>
                            <p className="text-xl text-gray-300 ">Total Students</p>
                            {
                                loading['getTodaysAttendence']
                                    ? <Spinner className='w-8 h-8' />
                                    : <p className="text-4xl font-bold">{todaysAttendence?.totalStudents}</p>
                            }
                            {/* <p className="text-4xl font-bold">{todaysAttendence?.totalStudents}</p> */}
                        </div>
                        <div className=' bg-gray-800 border border-gray-600  w-[30%] px-4 py-2 rounded-xl flex flex-col gap-5 pb-5'>
                            <p className="text-xl text-gray-300">Attended</p>
                            {
                                loading['getTodaysAttendence']
                                    ? <Spinner className='w-8 h-8' />
                                    : <p className="text-4xl font-bold text-green-600">{todaysAttendence?.attendence}</p>
                            }
                        </div>
                        <div className=' bg-gray-800 border border-gray-600  w-[30%] px-4 py-2 rounded-xl flex flex-col gap-5 pb-5'>
                            <p className="text-xl text-gray-300">Absent</p>
                            {
                                loading['getTodaysAttendence']
                                    ? <Spinner className='w-8 h-8' />
                                    : <p className="text-4xl font-bold text-red-600">{todaysAttendence?.absent}</p>
                            }
                        </div>
                    </CardContent>
                </Card>
                {/* <div className='border h-full p-5 flex flex-col gap-7'>
                    <div className='border h-[60px]'></div>
                    <div className='border flex-1'></div>
                </div> */}
            </div>
        </div>
    )
}

export default ViewAttendence