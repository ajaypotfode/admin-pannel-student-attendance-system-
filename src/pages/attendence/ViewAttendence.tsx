// import { ClassCard } from '@/components/ClassCard';
import { ClassCard } from '@/components/ClassCard';
import { PaginationComponent } from '@/components/Pagination';
import { SelectInput } from '@/components/SelectInput';
import { CardsSkeleton, TableSkeleton } from '@/components/Spinner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import UseAttendenceData from '@/hooks/useAttendenceData';
import UseClassData from '@/hooks/useClassData';
import { format } from 'date-fns';
// import { format } from 'date-fns';
import { useEffect } from 'react'


const ViewAttendence = () => {

    const { fetchActiveClass, activeClasses, } = UseClassData();
    const { attendanceData, fetchAttendence, attendenceParams, getAttendenceParams, loading, pages } = UseAttendenceData()
    // const {}=

    useEffect(() => {
        fetchActiveClass({});
    }, [])


    return (
        <div className='w-full h-screen overflow-y-auto scrollbar-hidden'>
            <h1 className="smallsc1:text-4xl text-2xl text-white font-bold ml-6 mt-4">View Attendance</h1>
            <div className="flex flex-col space-x-6 gap-6 p-5  h-[94%] w-full">
                {/* <div className="flex justify-start space-x-6 items-center smallsc1:p-7 p-5 w-full  overflow-hidden"> */}
                <div className='flex  justify-start space-x-6 items-center px-7 w-full overflow-x-auto scrollbar-hidden  '>
                    {loading['getActiveClasses'] ? (<CardsSkeleton />)
                        : (
                            activeClasses.map((cls, idx) => (
                                <ClassCard
                                    key={idx}
                                    className={cls.className}
                                    trainer={cls.trainer.userName}
                                    classId={cls._id}
                                    time={cls.time}
                                    onclick={() => getAttendenceParams(cls._id, 'classId')}
                                    currentClass={attendenceParams.classId}
                                />
                            ))
                        )}
                    {/* </div> */}
                </div>
                <Card className="w-full pt-0 bg-gray-900 border border-gray-500 text-white mx-auto rounded-xl relative overflow-hidden">
                    <CardHeader className=' place-content-end pt-4 md:flex-row flex-col space-y-2 '>
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex gap-x-4">
                                <SelectInput
                                    getValue={getAttendenceParams}
                                    options={
                                        [
                                            { value: 'todays', label: 'todays' },
                                            { value: 'yesterday', label: 'yesterday' },
                                            { value: 'customeDate', label: 'customeDate' }
                                        ]

                                    }
                                    inputValue={attendenceParams.date}
                                />
                                {attendenceParams.date === 'customeDate' &&
                                    <Input
                                        type='date'
                                        onChange={(e) => getAttendenceParams(e.target.value, 'customeDate')}
                                        value={attendenceParams.customeDate}
                                        max={format(new Date(), 'yyyy-MM-dd')}
                                    />
                                }
                                <Button className='bg-white text-black hover:bg-white ' onClick={() => fetchAttendence({})} >Fetch Attendence</Button>
                            </div>
                        </div>
                        {/* <CardTitle className="text-2xl font-bold">Attendance Overview</CardTitle> */}
                    </CardHeader>
                    <CardContent className="smallsc1:p-6 p-4 pt-0 h-full flex flex-col">

                        <div className="flex-1 overflow-y-auto scrollbar-hidden">
                            {
                                loading['getAttendence'] ? <TableSkeleton />
                                    : (
                                        <Table className="smallsc1:text-lg xl:text-md text-sm w-full">
                                            <TableHeader className="sticky top-0 bg-gray-900 z-10">
                                                <TableRow>
                                                    {/* <TableHead className="text-white font-bold">Session No</TableHead> */}
                                                    <TableHead className=" text-white font-bold">Student Name</TableHead>
                                                    <TableHead className="text-white font-bold">Email</TableHead>
                                                    <TableHead className="text-white font-bold">present</TableHead>
                                                    <TableHead className=" text-white font-bold text-center">Absent</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {attendanceData.attendendStudents.map((attendence, index) => (
                                                    <TableRow key={index} className="">
                                                        <TableCell>{attendence.studentId?.userName}</TableCell>
                                                        <TableCell>{attendence.studentId?.email}</TableCell>
                                                        <TableCell>{attendence.summary?.present ? 'yes' : 'no'}</TableCell>
                                                        <TableCell className="text-center">{!attendence.summary?.present ? 'yes' : 'no'}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    )
                            }
                        </div>
                    </CardContent>

                    <CardFooter className="relative w-full">
                        <div className='absolute bottom-0 left-5 text-lg font-extrabold text-gray-500 '>
                            Total Class :<span className='text-white ml-3'>{attendanceData.totalAttendence?.totalStudents}</span> (
                            <span className='text-green-600'>{attendanceData.totalAttendence?.attendence}</span> /
                            <span className='text-red-700'>{attendanceData?.totalAttendence?.absent}</span>
                            )
                        </div>
                        <div className='absolute bottom-0 right-8  '>
                            <PaginationComponent
                                pageNum={pages['getAttendence']?.pageNum || 0}
                                totalPage={pages['getAttendence']?.totalPages || 0}
                                getNextPage={fetchAttendence}
                            />
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default ViewAttendence