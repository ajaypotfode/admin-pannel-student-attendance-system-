import { useCallback, useEffect } from 'react'
import UseAttendenceData from '../../hooks/useAttendenceData'
import UseCommonData from '@/hooks/useCommonData'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { SelectClass } from '@/components/SelectClass'
import { TableSkeleton } from '@/components/Spinner'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { PaginationComponent } from '@/components/Pagination'
import UseClassData from '@/hooks/useClassData'
import { Input } from '@/components/ui/input'
import { ConformationDialog } from '@/components/ui/confirmationDialog'

const MarkAttendence = () => {
    const { fetchAllClassStudents, getDataForAttendence, allClassStudents, dataForMarkAttendence, markStudentAttendence,
        pages, loading } = UseAttendenceData()
    const { fetchActiveClass, activeClasses } = UseClassData()
    const { userSearch, getUserSearchValue, debouncing } = UseCommonData()

    const debouncingFetchStudents = useCallback(
        debouncing(fetchAllClassStudents, 500),
        []
    )

    useEffect(() => {
        if (Array.isArray(allClassStudents)) {
            debouncingFetchStudents({ search: userSearch['markAttendance'] })
        }
    }, [userSearch, debouncingFetchStudents])


    return (
        <div className="w-full h-full">
            <h1 className="smallsc1:text-4xl text-2xl text-white font-bold ml-6 mt-4">Mark Students Attendence</h1>
            <div className="flex justify-center space-x-6 gap-6 p-5 py-8  h-[94%] w-full ">
                <Card className="w-full bg-gray-900 border border-gray-500 text-white mx-auto rounded-xl relative overflow-hidden">
                    <CardContent className="smallsc1:p-6 p-4 pt-0 h-full flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex gap-x-4 w-full">
                                <SelectClass fetchData={fetchActiveClass} getClassId={getDataForAttendence} classData={activeClasses} loading={loading} />
                                {
                                    Array.isArray(allClassStudents) &&
                                    <Input placeholder="Enter Student Name " value={userSearch['markAttendance'] || ''} className='w-fit' onChange={(e) => getUserSearchValue(e.target.value, 'markAttendance')} />}
                                {/* <ComboboxDemo /> */}
                            </div>
                            {
                                dataForMarkAttendence.studentIds.length > 0 &&

                                <ConformationDialog
                                    text={`Confirm marking attendance for ${dataForMarkAttendence.studentIds.length} out of ${allClassStudents?.length} students.
                                         Please verify the Students list before proceeding.`}
                                    heading='Confirm Students'
                                    enableButton={dataForMarkAttendence.studentIds.length === 0}
                                    buttonText='Mark Attrndence'
                                    clickConfirm={markStudentAttendence}
                                />


                                // <Button className='bg-white text-black hover:bg-gray-400' onClick={markStudentAttendence}>Mark Attrndence</Button>
                            }
                        </div>
                        <div className="flex-1 overflow-y-auto scrollbar-hidden z-10 ">
                            {
                                loading['getAllClassStudents'] ? (<TableSkeleton />)
                                    : (
                                        <Table className="smallsc1:text-lg xl:text-md text-sm w-full">
                                            <TableHeader className="sticky top-0 bg-gray-900 z-10">
                                                <TableRow>
                                                    <TableHead className="text-white">Select</TableHead>
                                                    <TableHead className="text-white">Students</TableHead>
                                                    <TableHead className="text-white">Email</TableHead>
                                                    <TableHead className='text-white'>Contact No</TableHead>
                                                    <TableHead className="text-white">Status</TableHead>
                                                    {/* <TableHead className="text-white text-end">Action</TableHead> */}
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {allClassStudents && allClassStudents.map((student, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell>
                                                            <Checkbox
                                                                className=' data-[state=checked]:bg-green-600 w-5 h-5 '
                                                                checked={dataForMarkAttendence.studentIds.includes(student._id)}
                                                                onCheckedChange={() => getDataForAttendence(student._id)} />
                                                        </TableCell>
                                                        <TableCell>
                                                            {/* <div className="font-medium text-white">{student.userName}</div>
                                                    <div className="text-muted-foreground text-sm">{student.email}</div> */}
                                                            <div className="font-medium text-white">{student.userName}</div>
                                                            {/* <div className="text-muted-foreground text-sm">{txn.email}</div> */}
                                                        </TableCell>
                                                        <TableCell className="font-medium text-white">
                                                            {student.email}
                                                        </TableCell>
                                                        <TableCell className="font-medium text-white">
                                                            {student.contactNo}
                                                        </TableCell>
                                                        <TableCell className="font-medium text-white flex">
                                                            {student.status}
                                                        </TableCell>

                                                    </TableRow>

                                                ))}
                                            </TableBody>
                                        </Table>
                                    )
                            }
                        </div>
                    </CardContent>
                    <CardFooter className="absolute bottom-0 left-0 right-0 z-20 ">
                        <div className=' text-sm text-red-600 py-4 '>
                            Warning: Marking attendance will close the class for today and prevent further changes. Please confirm Students before proceeding.

                        </div>
                        <div className='absolute bottom-0 right-4'>
                            <PaginationComponent
                                pageNum={pages['getAllClassStudents']?.pageNum || 0}
                                totalPage={pages['getAllClassStudents']?.totalPages || 0}
                                getNextPage={fetchAllClassStudents}
                            />
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>

    )
}

export default MarkAttendence