import { PaginationComponent } from '@/components/Pagination';
import SelectClass from '@/components/SelectClass';
import { TableSkeleton } from '@/components/Spinner';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import UseAttendenceData from '@/hooks/useAttendenceData';
import UseClassData from '@/hooks/useClassData';

const AttendenceSummary = () => {
    const { allClasses, fetchClassReference, loading, pages } = UseClassData();
    // const { pages } = UseCommonData()
    const { getAttendenceHistoryParams, attendenceSummary, fetchStudentAttendenceSummary } = UseAttendenceData();


    return (
        <div className="w-full h-full">
            <h1 className="smallsc1:text-4xl text-2xl text-white font-bold ml-6 mt-4">Students Attendence Summary </h1>
            <div className="flex justify-center space-x-6 gap-6 p-5 smallsc1:py-8 py-4 h-[94%] w-full ">
                <Card className="w-full pt-0 bg-gray-900 border border-gray-500 text-white mx-auto rounded-xl relative overflow-hidden">
                    <CardContent className="smallsc1:p-6 p-4 h-full flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex gap-x-4 w-full">
                                <Input placeholder="Enter Student Name " className='w-fit' onChange={(e) => getAttendenceHistoryParams(e.target.value, 'email')} />
                                {/* <ComboboxDemo /> */}
                                <SelectClass classData={allClasses} fetchData={fetchClassReference} getClassId={getAttendenceHistoryParams} loading={loading} />
                                {/* <Button onClick={fetchStudentAttendenceSummary}>Get History</Button> */}
                            </div>
                            <div className=''>
                                <p className='font-bold smallsc1:text-xl xl:text-lg text-md'>{attendenceSummary?.sessions?.studentId.userName || ""}</p>
                                <p className='text-gray-500 whitespace-nowrap smallsc1:text-lg xl:text-md text-sm '>
                                    {`${attendenceSummary?.sessions?.classId.className || ""} ${attendenceSummary?.sessions?.classId.time || ""}`}
                                </p>

                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto scrollbar-hidden">
                            {
                                loading['getAttendenceSummary'] ? <TableSkeleton />
                                    : (
                                        <Table className="smallsc1:text-lg xl:text-md text-sm w-full">
                                            <TableHeader className="sticky top-0 bg-gray-900 z-10">
                                                <TableRow>
                                                    {/* <TableHead className="text-white font-bold">Session No</TableHead> */}
                                                    <TableHead className=" text-white font-bold">Date</TableHead>
                                                    <TableHead className="text-white font-bold">Time</TableHead>
                                                    <TableHead className="text-white font-bold">Attended</TableHead>
                                                    <TableHead className=" text-white font-bold text-center">Absent</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {attendenceSummary?.sessions?.summary.map((attendence, index) => (
                                                    <TableRow key={index} className="">
                                                        {/* <TableCell className="font-medium">Session-{index + 1}</TableCell> */}
                                                        <TableCell>{attendence.date}</TableCell>
                                                        <TableCell>{attendence.time}</TableCell>
                                                        <TableCell className={`${attendence.present ? 'text-green-700' : "text-red-700"}`} >
                                                            {attendence.present ? 'yes' : 'no'}
                                                        </TableCell>
                                                        <TableCell className={`${!attendence.present ? 'text-green-700' : "text-red-700"} text-center`} >
                                                            {!attendence.present ? 'yes' : 'no'}
                                                        </TableCell>
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
                            Total Class :<span className='text-white ml-3'>{attendenceSummary?.totalClass?.totalClass}</span> (
                            <span className='text-green-600'>{attendenceSummary?.totalClass?.attendence}</span> /
                            <span className='text-red-700'>{attendenceSummary?.totalClass?.absence}</span>
                            )
                        </div>
                        <div className='absolute bottom-0 right-8  '>
                            <PaginationComponent
                                pageNum={pages['getAttendenceSummary']?.pageNum || 0}
                                totalPage={pages['getAttendenceSummary']?.totalPages || 0}
                                getNextPage={fetchStudentAttendenceSummary}
                            />
                            {/* <PaginationComponent pageNum={attendenceSummary?.pageNum || 0} totalPage={attendenceSummary?.totalPages || 0} /> */}
                        </div>
                        <div className='absolute -bottom-5 left-5 text-sm text-gray-500 '>
                            First add Student Email and then select Class to see student Attendence History.
                        </div>

                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default AttendenceSummary