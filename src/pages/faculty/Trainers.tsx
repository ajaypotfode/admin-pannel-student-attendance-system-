import { PaginationComponent } from '@/components/Pagination'
import { ProfileCardSkeleton2, TableSkeleton } from '@/components/Spinner'
// import ProfileCard from '@/components/ProfileCard'
// import { ComboboxDemo } from '@/components/SelectBox'
import TrainerProfileCard from '@/components/TrainerProfileCard'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import UseCommonData from '@/hooks/useCommonData'
import UseUserData from '@/hooks/useUserData'
import { useCallback, useEffect } from 'react'
// import React from 'react'

const Trainers = () => {
    const { userSearch, debouncing, getUserSearchValue, pages } = UseCommonData();
    const { fetchAllTrainers, fetchTrainer, allTrainers, trainer, loading } = UseUserData();

    const debouncingFetchTrainers = useCallback(
        debouncing(fetchAllTrainers, 500),
        []
    )

    useEffect(() => {
        debouncingFetchTrainers({ search: userSearch['trainers'] })
    }, [userSearch, debouncingFetchTrainers])


    return (
        <div className="w-full h-full ">
            <h1 className="smallsc1:text-4xl text-2xl text-white font-bold ml-6 mt-4">All Trainers</h1>
            <div className="flex justify-center space-x-6 gap-6 p-5 py-8 h-[94%] w-full ">
                <Card className="pt-0 w-[60%] bg-gray-900 border border-gray-500 text-white mx-auto rounded-xl relative overflow-hidden">
                    <CardContent className="smallsc1:p-6 p-4 h-full flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex gap-x-4 w-full">
                                <Input placeholder="Search Trainer " value={userSearch['trainers']} className='w-fit' onChange={(e) => getUserSearchValue(e.target.value, 'trainers')} />
                                {/* <ComboboxDemo /> */}
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto scrollbar-hidden">
                            {
                                loading['getAllTrainers'] ? <TableSkeleton />
                                    : (
                                        <Table className="smallsc1:text-lg xl:text-md text-sm w-full">
                                            <TableHeader className="sticky top-0 bg-gray-900 z-10">
                                                <TableRow>
                                                    <TableHead className="text-white">Trainers</TableHead>
                                                    <TableHead className="text-white">Contact</TableHead>
                                                    <TableHead className="text-white">Status</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {allTrainers.map((trainer, index) => (
                                                    <TableRow key={index} onClick={() => fetchTrainer(trainer._id)} className='cursor-pointer' >
                                                        <TableCell>
                                                            <div className="font-medium text-white">{trainer.userName}</div>
                                                            <div className="text-muted-foreground text-sm">{trainer.email}</div>
                                                        </TableCell>
                                                        <TableCell className="font-medium text-white">
                                                            {trainer.contactNo}
                                                        </TableCell>
                                                        <TableCell className="font-medium text-white">
                                                            {trainer.status}
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
                            pageNum={pages['getAllTrainers']?.pageNum || 0}
                            totalPage={pages['getAllTrainers']?.totalPages || 0}
                            getNextPage={fetchAllTrainers}
                        />
                    </CardFooter>
                </Card>


                {/* profile Card */}
                <div className="h-full  smallsc1:p-7 p-5 rounded-2xl bg-gray-900 flex flex-1 justify-center">
                    {loading['getTrainer'] ? <ProfileCardSkeleton2 />
                        : <TrainerProfileCard user={trainer} />
                    }
                </div>
            </div>
        </div>
    )
}

export default Trainers