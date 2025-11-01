import { PaginationComponent } from '@/components/Pagination'
import { ProfileCardSkeleton2, TableSkeleton } from '@/components/Spinner'
import StudentProfileCard from '@/components/StudentProfileCard'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import UseCommonData from '@/hooks/useCommonData'
import UseUserData from '@/hooks/useUserData'
// import { Table } from 'lucide-react'
import { useCallback, useEffect } from 'react'


const StudentList = () => {
    const { userSearch, debouncing, getUserSearchValue } = UseCommonData();
    const { fetchAllStudents, fetchStudent, allStudents, student, loading, pages } = UseUserData()

    const debouncingFetchStudents = useCallback(
        debouncing(fetchAllStudents, 500), []
    )

    useEffect(() => {
        debouncingFetchStudents({ search: userSearch['students'] })
    }, [userSearch, debouncingFetchStudents])


    return (
        <div className="w-full h-full">
            <h1 className="smallsc1:text-4xl text-2xl text-white font-bold ml-6 mt-4">All Students</h1>
            <div className="flex justify-center space-x-6 gap-6 p-5 py-8  h-[94%] w-full ">
                <Card className="w-[60%] bg-gray-900 border border-gray-500 text-white mx-auto rounded-xl relative overflow-hidden">
                    <CardContent className="smallsc1:p-6 p-4 pt-0 h-full flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex gap-x-4 w-full">
                                <Input placeholder="Enter Student Name " value={userSearch['students']} className='w-fit' onChange={(e) => getUserSearchValue(e.target.value, 'students')} />
                                {/* <ComboboxDemo /> */}
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto scrollbar-hidden">
                            {
                                loading['getAllStudents'] ? <TableSkeleton />
                                    : (
                                        <Table className="smallsc1:text-lg xl:text-md text-sm w-full">
                                            <TableHeader className="sticky top-0 bg-gray-900 z-10">
                                                <TableRow>
                                                    <TableHead className="text-white">Students</TableHead>
                                                    <TableHead className="text-white">Contact</TableHead>
                                                    <TableHead className="text-white">Status</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {allStudents.map((student, index) => (
                                                    <TableRow key={index} onClick={() => fetchStudent(student.email)}>
                                                        <TableCell>
                                                            <div className="font-medium text-white">{student.userName}</div>
                                                            {/* <div className="text-muted-foreground text-sm">{student.email}</div> */}
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

                    <CardFooter className="absolute bottom-0 right-0">
                        <PaginationComponent
                            pageNum={pages['getAllStudents']?.pageNum || 0}
                            totalPage={pages['getAllStudents']?.totalPages || 0}
                            getNextPage={fetchAllStudents}
                        />
                    </CardFooter>
                </Card>


                {/* profile Card */}
                <div className="h-full  smallsc1:p-7 p-5 rounded-2xl bg-gray-900 flex flex-1 justify-center">
                    {
                        loading['getStudent'] ? <ProfileCardSkeleton2 />
                            : (<StudentProfileCard user={student} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default StudentList