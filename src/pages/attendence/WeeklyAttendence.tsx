
import { SelectClass } from '@/components/SelectClass';
import { TableSkeleton } from '@/components/Spinner';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import UseAttendenceData from '@/hooks/useAttendenceData';
import UseClassData from '@/hooks/useClassData';


const WeeklyAttendence = () => {
    const { allClasses, fetchClassReference } = UseClassData();
    const { weekAttendence, fetchWeeklyAttendence, handleDateRange, summaryParams, loading } = UseAttendenceData()

    return (
        <div className="w-full h-full">
            <h1 className="smallsc1:text-4xl text-2xl text-white font-bold ml-6 mt-4">Weekly Attendence Summary </h1>
            <div className="flex justify-center space-x-6 gap-6 p-5 smallsc1:py-8 py-4 h-[94%] w-full ">
                <Card className="w-full pt-0 bg-gray-900 border border-gray-500 text-white mx-auto rounded-xl relative overflow-hidden">
                    <CardContent className="smallsc1:p-6 p-4 h-full flex flex-col">
                        <div className="flex xl:flex-row flex-col items-center justify-between mb-4">
                            <div className="flex gap-x-4 w-full">
                                {/* <Input placeholder="Enter Student Name " className='w-fit' /> */}
                                <Input
                                    type='date'
                                    placeholder="Enter Start Date "
                                    className='focus:ring-0 focus:outline-0 border-0 outline-none w-fit'
                                    onChange={(e) => handleDateRange(e.target.value)}
                                    value={summaryParams.startDate || ""}
                                    // readOnly
                                    onKeyDown={(e) => e.preventDefault()}
                                />/

                                <Input
                                    type='date'
                                    placeholder="Enter End date "
                                    className='border-0 outline-none w-fit'
                                    defaultValue={summaryParams.endDate || ""}
                                    disabled
                                />
                                <SelectClass
                                    classData={allClasses}
                                    fetchData={fetchClassReference}
                                    getClassId={fetchWeeklyAttendence}
                                    loading={loading}
                                // classId={summaryParams.classId}
                                />
                                {/* <Button onClick={fetchWeeklyAttendence} >Get Summary</Button> */}
                            </div>
                            {/* <div className='self-end'>
                                <p className='font-bold smallsc1:text-xl xl:text-lg text-md'>Java Script</p>
                                <p className='text-gray-500 whitespace-nowrap smallsc1:text-lg xl:text-md text-sm '>Aman gawade 12:30 </p>

                            </div> */}
                        </div>

                        <div className="flex-1 overflow-y-auto scrollbar-hidden">
                            {
                                loading['getWeeklyAttendence'] ? <TableSkeleton />
                                    : (
                                        <Table className="smallsc1:text-lg xl:text-md text-sm w-full">
                                            <TableHeader className="sticky top-0 bg-gray-900 z-10">
                                                <TableRow>
                                                    <TableHead className="text-white font-bold">Session No</TableHead>
                                                    <TableHead className=" text-white font-bold text-center">Date</TableHead>
                                                    <TableHead className="text-white font-bold text-center">Total Student</TableHead>
                                                    <TableHead className="text-white font-bold text-center">Attended</TableHead>
                                                    <TableHead className=" text-white font-bold text-center">Absent</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {weekAttendence.map((attendence, index) => (
                                                    <TableRow key={index} className="">
                                                        <TableCell className="font-medium">session-{index + 1}</TableCell>
                                                        <TableCell className='text-center'>{attendence.date}</TableCell>
                                                        <TableCell className='text-center'>{attendence.totalStudents}</TableCell>
                                                        <TableCell className='text-center'>{attendence.attendence}</TableCell>
                                                        <TableCell className="text-center">{attendence.absent}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    )
                            }
                        </div>
                    </CardContent>
                    {/* 
                    <CardFooter className="absolute bottom-0 right-0">
                        <PaginationComponent />
                    </CardFooter> */}
                </Card>
            </div>
        </div>
    )
}

export default WeeklyAttendence