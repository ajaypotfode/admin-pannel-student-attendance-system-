import { PaginationComponent } from '@/components/Pagination'
import { SelectClass } from '@/components/SelectClass'
import { TableSkeleton } from '@/components/Spinner'
import { Button } from '@/components/ui/button'
// import { ComboboxDemo } from '@/components/SelectBox'
// import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
// import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import UseClassData from '@/hooks/useClassData'
import UseCommonData from '@/hooks/useCommonData'



const AssignClass = () => {

    const { /*userSearch, debouncing, getUserSearchValue,*/ pages } = UseCommonData();
    // const { fetchAllStudents, allStudents } = UseUserData();
    const { classAssignmentData, getAssignClassData, fetchActiveClass, activeClasses, /*fetchStudentsForClassAssignment,*/ availableStudents, assignClassToStudent, loading, getAvailableStudents } = UseClassData()
    // const { getAssignClassData } = UseClassData()
    // const {}

    // const debouncingFetchStudents = useCallback(
    //     debouncing(fetchStudentsForClassAssignment, 500), []
    // )

    // useEffect(() => {
    //     if (userSearch) {
    //         debouncingFetchStudents(userSearch)
    //     }
    // }, [userSearch, debouncingFetchStudents])


    return (

        <div className="w-full h-full">
            <h1 className="smallsc1:text-4xl text-2xl text-white font-bold ml-6 mt-4">Assign Class To Students</h1>
            <div className="flex justify-center space-x-6 gap-6 p-5 py-8  h-[94%] w-full ">
                <Card className="w-full bg-gray-900 border border-gray-500 text-white mx-auto rounded-xl relative overflow-hidden">
                    <CardContent className="smallsc1:p-6 p-4 pt-0 h-full flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex gap-x-4 w-full">
                                <SelectClass fetchData={fetchActiveClass} getClassId={getAssignClassData} classData={activeClasses} loading={loading} />
                                {
                                    classAssignmentData.studentsId.length > 0 &&
                                    <Button className='bg-white text-black hover:bg-gray-400' onClick={assignClassToStudent}>Assign Class</Button>
                                    // classAssignmentData.studentsId.length > 0 ?
                                    //     <>
                                    //         <Input placeholder="Enter Student Name " className='w-fit' value={userSearch} onChange={(e) => getUserSearchValue(e.target.value)} />
                                    //         <Button onClick={getAddClass}>Assign Class</Button>
                                    //     </>
                                    //     : <Button onClick={() => fetchStudentsForClassAssignment()} >Get Students</Button>
                                }
                                {/* <Input placeholder="Enter Student Name " className='w-fit' value={search} onChange={(e) => getSearchValue(e.target.value)} /> */}
                                {/* <ComboboxDemo /> */}
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto scrollbar-hidden">
                            {
                                loading['getStudentForClassAssignment'] ? (<TableSkeleton />)
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
                                                {availableStudents.map((student, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell>
                                                            <Checkbox
                                                                className=' checked:bg-white checked:text-gray-500'
                                                                checked={classAssignmentData.studentsId.includes(student._id)}
                                                                onCheckedChange={() => getAssignClassData(student._id)} />
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
                                                        <TableCell className="font-medium text-white">
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
                    <CardFooter className="relative w-full">
                        <div className='absolute bottom-0 left-5 text-sm text-gray-500 '>
                            select Class to see available students.
                        </div>
                        <div className='absolute bottom-0 right-0  '>
                            <PaginationComponent
                                pageNum={pages['getStudentForClassAssignment']?.pageNum || 0}
                                totalPage={pages['getStudentForClassAssignment']?.totalPages || 0}
                                getNextPage={getAvailableStudents}
                            />
                        </div>

                    </CardFooter>
                    {/* <CardFooter className="absolute bottom-0 right-0">
                        <PaginationComponent pageNum={pages?.pageNum || 0} totalPage={pages?.totalPages || 0} />
                    </CardFooter> */}
                </Card>
            </div>
            {/* <AssignClassForm /> */}
        </div>

    )
}

export default AssignClass