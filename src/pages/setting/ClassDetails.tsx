import { useCallback, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
// import { Button } from '@/components/ui/button'
import ClassForm from '@/components/ClassForm'
import UseClassData from '@/hooks/useClassData'
import { Input } from '@/components/ui/input'
import UseCommonData from '@/hooks/useCommonData'
import { ClassConformation } from '@/components/ClassConfirmationBox'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { PaginationComponent } from '@/components/Pagination'
import { TableSkeleton } from '@/components/Spinner'
import { getUpdateClassDataService } from '@/service/localStorageService'
import { Edit } from 'lucide-react'
// import { updateClass } from '@/redux/slice/classSlice'

const ClassDetails = () => {
    const { allClasses, fetchClass, markClassAsComplete, generateNewClass, classForm, setClassForm, loading, handleOpenClassForm, updateClass } = UseClassData();
    const { classSearch, debouncing, getClassSearchValue, pages } = UseCommonData()


    const debouncingFetch = useCallback(
        debouncing(fetchClass, 500), []
    )

    useEffect(() => {
        debouncingFetch({ search: classSearch['classDetails'] })
    }, [classSearch, debouncingFetch])



    return (
        <div className="w-full h-full ">
            <h1 className="smallsc1:text-4xl text-2xl text-white font-bold ml-6 mt-4">All Classes</h1>
            <div className="flex justify-center space-x-6 gap-6 p-5 py-8  h-[94%] w-full">
                <Card className="w-full bg-gray-900 border border-gray-500 text-white mx-auto rounded-xl relative h-full overflow-hidden">
                    <CardContent className="smallsc1:p-6 p-4 pt-0 h-full flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <div className='flex justify-between w-full'>
                                <Input placeholder="Enter Class Name " value={classSearch['classDetails']} className='w-fit' onChange={(e) => getClassSearchValue(e.target.value, 'classDetails')} />
                                <Button className=' bg-white text-black hover:bg-gray-400 ' onClick={() => handleOpenClassForm()}>
                                    Add Class +
                                </Button>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto scrollbar-hidden">
                            {
                                loading['getClasses'] ? <TableSkeleton />
                                    : (
                                        <Table className="smallsc1:text-lg xl:text-md text-sm w-full">
                                            <TableHeader className="sticky top-0 bg-gray-900 z-10">
                                                <TableRow>
                                                    <TableHead className="text-white">ClassName</TableHead>
                                                    <TableHead className=" text-white">Trainer</TableHead>
                                                    <TableHead className="text-white">Time</TableHead>
                                                    <TableHead className=" text-white text-center">Students</TableHead>
                                                    <TableHead className="text-end text-white">Status</TableHead>
                                                    <TableHead className=" text-white text-end">Action</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {allClasses.map((cls, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell>
                                                            <div className="font-medium text-white">{cls.className}</div>
                                                            {/* <div className="text-muted-foreground text-sm">{cls.email}</div> */}
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="font-medium text-white">{cls.trainer.userName}</div>
                                                            {/* <div className="text-muted-foreground text-sm">{cls.email}</div> */}
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className="font-medium text-white">{cls.time}</div>
                                                            {/* <div className="text-muted-foreground text-sm">{cls.email}</div> */}
                                                        </TableCell>
                                                        <TableCell className='text-center'>
                                                            <div className="font-medium text-white">{cls.totalStudents}</div>
                                                            {/* <div className="text-muted-foreground text-sm">{cls.email}</div> */}
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className=" text-end font-medium text-white">{cls.status}</div>
                                                            {/* <div className="text-muted-foreground text-sm">{txn.email}</div> */}
                                                        </TableCell>
                                                        <TableCell>
                                                            <div className=" text-end font-medium text-white space-x-2 ">
                                                                <Button className='bg-transparent outline-0' disabled={cls.status === 'complete'||cls.totalStudents>0} onClick={() => handleOpenClassForm(
                                                                    {
                                                                        className: cls.className,
                                                                        id: cls._id,
                                                                        time: cls.time,
                                                                        trainer: cls.trainer._id
                                                                    }
                                                                )}>
                                                                    <Edit className='h-20 w-20' />
                                                                </Button>


                                                                <ClassConformation
                                                                    classId={cls._id}
                                                                    className={cls.className}
                                                                    classTime={cls.time}
                                                                    classTrainer={cls.trainer.userName}
                                                                    markComplete={() => markClassAsComplete(cls._id)}
                                                                    status={cls.status}
                                                                />
                                                            </div>
                                                            {/* <div className="text-muted-foreground text-sm">{txn.email}</div> */}
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
                        <div className='absolute bottom-0 right-0  '>
                            <PaginationComponent
                                pageNum={pages['getClasses']?.pageNum || 0}
                                totalPage={pages['getClasses']?.totalPages || 0}
                                getNextPage={fetchClass}
                            />
                        </div>

                    </CardFooter>
                </Card>
            </div>
            {
                classForm && <ClassForm setClassForm={setClassForm} generateClass={generateNewClass} updateClass={updateClass} getDefaultValues={getUpdateClassDataService} />
            }
        </div>
    )
}

export default ClassDetails