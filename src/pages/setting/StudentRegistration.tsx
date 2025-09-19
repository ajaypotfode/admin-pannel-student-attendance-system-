import { SelectInput } from '@/components/SelectInput'
import { Button } from '@/components/ui/button'
import { Card, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import UseRegistrationData from '@/hooks/useRegistrationData'
import { Label } from '@radix-ui/react-label'
import { useEffect } from 'react'
// import React, { useEffect, useState } from 'react'

const StudentRegistration = () => {

    const { fetchRegistrationStatus, getRegistrationData, handleRegistrationStatus, registrationData, setRegistrationValue, loading } = UseRegistrationData()


    useEffect(() => {
        fetchRegistrationStatus()
    }, [])

    return (
        <div className="w-full h-full overflow-y-auto p-4 ">
            <h1 className="smallsc1:text-4xl text-2xl text-white font-bold ml-6">Handle Student Registration </h1>
            {/* <div className=' p-8 w-full border'> */}
            <div className="flex justify-center space-x-6 gap-6 p-5 py-8 w-full ">
                <Card className="flex-1 bg-gray-900 border border-gray-500 text-white mx-auto rounded-xl relative overflow-hidden p-8 ">
                    <form action="">
                        <div className="grid gap-4">
                            <div className="grid gap-3 ">
                                <Label htmlFor="date">Choose Closing Date</Label>

                                {
                                    loading['getRegistrationStatus'] ? <Skeleton className='w-[40%] h-5 bg-gray-600 ' />
                                        : (<Input
                                            id="date"
                                            type='date'
                                            name='date'
                                            className='border border-gray-500  w-[40%]'
                                            value={registrationData.date || ""}
                                            //  defaultValue={'2025-03-14'} 
                                            onChange={getRegistrationData}
                                        />)
                                }
                            </div>
                            <div className="grid gap-3 ">
                                <Label htmlFor="time">Choose Closing Time</Label>
                                {loading['getRegistrationStatus'] ? <Skeleton className='w-[40%] h-5 bg-gray-600 ' />
                                    : (<Input
                                        id="time"
                                        type='time'
                                        name='time'
                                        className='border border-gray-500  w-[40%]'
                                        value={registrationData.time}
                                        onChange={getRegistrationData} />)}
                            </div>
                            <div className="grid gap-3 w-[40%]">
                                <Label htmlFor="username-1">Select Status</Label>
                                {/* <Skeleton className='w-[40%] h-5 bg-gray-600 ' /> */}
                                {loading["getRegistrationStatus"] ? <Skeleton className='w-[40%] h-5 bg-gray-600 ' />
                                    : (<SelectInput
                                        // getValue={getUserStatus}
                                        getValue={setRegistrationValue}
                                        options={
                                            [
                                                { value: "true", label: 'Open Registration' },
                                                { value: "false", label: 'Close Registration' }
                                            ]

                                        }


                                        inputValue={registrationData.registration === true ? 'true'
                                            : (registrationData.registration === false ? 'false' : "")}
                                    />)}
                                {/* <ComboboxDemo /> */}
                                {/* <Input id="username-1" name="username" defaultValue="@peduarte" /> */}
                            </div>
                            <div className='flex justify-between w-full'>
                                {registrationData.registration === true && <Button className='w-fit' onClick={handleRegistrationStatus}  >Open Registration</Button>}
                                {registrationData.registration === false && <Button className='w-fit' onClick={handleRegistrationStatus}  >close Registration</Button>}
                                {/* <Button className='w-fit' onClick={handleRegistrationStatus}  >{registrationData.registration === true ? "Open Registration" : "Close Registration"}</Button> */}


                                {/* <Button className='w-fit' onClick={handleRegistrationStatus}  >{registrationData.registration === true ? "Open Registration" : "Close Registration"}</Button> */}
                            </div>

                        </div>

                    </form>
                    <CardFooter>
                        <ul className='text-gray-500'>
                            <li> Choose “Close Registration” if you want to stop further student registrations.</li>
                            <li>Keep it as “Open Registration” to allow students to continue registering.</li>
                        </ul>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default StudentRegistration