// import React from 'react'
// import { Button } from "@/components/ui/button"
// import {
//     Card,
//     CardContent,
//     CardFooter,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { SelectInput } from '@/components/SelectInput'
import SignUpForm from '@/components/SignUpForm'
import UseAuth from '@/hooks/useAuth'

const AddTrainers = () => {
    const { getUserRegister,imageRef } = UseAuth()

    return (
        <div className="w-full h-full overflow-y-auto p-6 scrollbar-hidden ">
            <h1 className="text-2xl smallsc1:text-4xl font-bold text-white mb-6">Add Trainer</h1>
            <div className='w-[60%] flex '>
                <SignUpForm onSubmit={getUserRegister} role='trainer' imageRef={imageRef} />
            </div>
        </div>


    )
}

export default AddTrainers