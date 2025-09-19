// // import React from 'react'
// import {
//     Dialog,
//     // DialogClose,
//     DialogContent,
//     DialogDescription,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "./ui/dialog"
import { Button } from './ui/button'
// import { Label } from './ui/label'
import { Input } from './ui/input'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ClassFormSchema } from "@/schema/classFormSchema"
import { SelectTrainer } from "./SelectTrainer"
import UseUserData from "@/hooks/useUserData"
// import { useState } from "react"
import { X } from "lucide-react"
import type { ClassDataType } from '@/types/ClassTyps'
// import { SelectTrainer } from "./SelectTrainer"
// import { ComboboxDemo } from './SelectBox'

// const 
interface ClassFormProps {
    setClassForm(value: boolean): void,
    generateClass(value: ClassDataType, reset: () => void): void
}



const ClassForm: React.FC<ClassFormProps> = ({ setClassForm, generateClass }) => {
    const { activeTrainer, fetchActiveTrainers, loading } = UseUserData()


    const form = useForm({
        resolver: zodResolver(ClassFormSchema),
        defaultValues: {
            className: "",
            time: "",
            trainer: ""
        },
    })

    return (
        // <Dialog >
        //     <DialogTrigger asChild>
        //         <Button variant="outline" className='bg-white text-black'>Add Class+</Button>
        //     </DialogTrigger>
        //     <DialogContent className=" w-[800px] bg-gray-900 border border-gray-500 text-white ">
        //         <DialogHeader>
        //             <DialogTitle className="text-2xl">Add Class</DialogTitle>
        //             <DialogDescription>
        //                 Mention A New Class
        //             </DialogDescription>
        //         </DialogHeader>
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-40">
            <div className="space-y-4 border bg-gray-900 w-[70%] p-6 text-white rounded-2xl relative ">
                <div className="">
                    <X className="absolute top-2 right-2" onClick={() => setClassForm(false)} />
                </div>
                <h1>Add Clss Details</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit((values) => generateClass(values, form.reset))} className="w-full space-y-6">
                        {/* <form className="w-full space-y-6"> */}
                        <FormField
                            control={form.control}
                            name="className"
                            render={({ field }) => (
                                // render={() => (
                                <FormItem>
                                    <FormLabel>Class Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="shadcn"
                                            // className='w-[20%] border border-gray-500 '
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="time"
                            render={({ field }) => (
                                // render={() => (
                                <FormItem>
                                    <FormLabel>Class Time</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="shadcn"
                                            type="time"
                                            className='w-[20%] border border-gray-500 '
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="trainer"
                            render={({ field }) => (

                                <FormItem>
                                    <FormLabel>Class Trainer</FormLabel>
                                    <FormControl>
                                        <SelectTrainer
                                            trainers={activeTrainer}
                                            fetchData={fetchActiveTrainers}
                                            getTrainer={field.onChange}
                                            trainerId={field.value}
                                            loading={loading}
                                        />

                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className='bg-white text-black hover:bg-gray-400' >Submit</Button>
                    </form>
                </Form>
                {/* <form action="">
                        <div className="grid gap-4">
                            <div className="grid gap-3  text-xl">
                                <Label htmlFor="name-1">ClassName</Label>
                                <Input id="name-1" name="name" defaultValue="Pedro Duarte" className='border border-gray-500' />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="classTime-1">Class Time</Label>
                                <Input id='classTime-1' name='classTime' type='time' defaultValue='10:30' className='w-[20%] border border-gray-500 ' />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="username-1">Select Trainer</Label>
                                <SelectTrainer />
                            </div>
                        </div>
                    </form> */}


            </div >
        </div>
    )
}

export default ClassForm



