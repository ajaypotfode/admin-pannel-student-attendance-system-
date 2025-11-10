import React from 'react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import type { ClassType } from '@/types/ClassTyps'
import { TableSkeleton } from './Spinner'
import { Link } from 'react-router-dom'



interface ClassProps {
    allClass: ClassType[],
    loading: { [key: string]: boolean }
}

const ClassDetailsTable: React.FC<ClassProps> = ({ allClass, loading }) => {
    return (
        <Card className="bg-gray-900 border border-gray-500 max-h-[500px] h-[500px] text-white mx-auto rounded-xl overflow-hidden w-[55%] ">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="smallsc1:text-lg text-md font-semibold">All Classes</h2>
                        <p className="text-sm text-muted-foreground">
                            All Classes Which is held By Our Organization
                        </p>
                    </div>
                    <Link to='/settings/classes' >
                        <Button variant='outline' className="xl:text-sm text-[12px]  bg-white text-black hover:bg-gray-400">View All</Button>
                    </Link>
                </div>

                {
                    loading['getClasses'] ? <TableSkeleton />
                        : (
                            <Table className='smallsc1:text-lg xl:text-md text-sm'>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-white">ClassName</TableHead>
                                        <TableHead className=" text-white">Trainer</TableHead>
                                        <TableHead className="text-white">Time</TableHead>
                                        <TableHead className=" text-white text-center">Students</TableHead>
                                        <TableHead className=" text-white">Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {allClass && allClass.map((cls, index) => (
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
                                                <div className="font-medium text-white">{cls.status}</div>
                                                {/* <div className="text-muted-foreground text-sm">{txn.email}</div> */}
                                            </TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )
                }
            </CardContent>
        </Card>
    )
}

export default ClassDetailsTable