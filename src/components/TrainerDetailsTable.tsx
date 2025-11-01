// import React from 'react'
import type { UserType } from '@/types/UserTypes'
import { Card, CardContent } from './ui/card'
// import { Button } from './ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { TableSkeleton } from './Spinner'

interface TrainerDetailsProps {
    allTrainers: UserType[],
    loading: { [key: string]: boolean }
}

const TrainerDetails: React.FC<TrainerDetailsProps> = ({ allTrainers, loading }) => {
    return (
        <Card className="bg-gray-900 border max-h-[500px] h-[500px] border-gray-500 text-white max-w-2xl flex-1 mx-auto rounded-xl overflow-y-auto scrollbar-hidden">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="smallsc1:text-lg text-md  font-semibold">All Trainers</h2>
                        <p className="xl:text-sm text-[12px] text-muted-foreground">
                            These trainers are part of our organization.
                        </p>
                    </div>
                    {/* <Button variant="outline" size="sm" className=" border-white bg-white text-black">
                        View All
                    </Button> */}
                </div>
                {
                    loading['getAllTrainers'] ? (<TableSkeleton />)
                        : (
                            <Table className='smallsc1:text-lg xl:text-md text-sm'>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-white">Trainer Name</TableHead>
                                        <TableHead className=" text-white">Contact</TableHead>
                                        <TableHead className="text-end text-white">Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {allTrainers.map((trainer, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <div className="font-medium text-white">{trainer.userName}</div>
                                                <div className="text-muted-foreground xl:text-sm text-[12px]">{trainer.email}</div>
                                            </TableCell>
                                            <TableCell className=" font-medium text-white">
                                                {trainer.contactNo}
                                            </TableCell>
                                            <TableCell className="text-end font-medium text-white ">
                                                {trainer.status}
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

export default TrainerDetails