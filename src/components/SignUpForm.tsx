import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerFormSchema, type RegisterFormType } from '@/schema/authFormSchema'
import { Link } from 'react-router-dom'
import { Spinner } from './Spinner'


interface SignUpFormProps {
    onSubmit(data: RegisterFormType, reset: () => void, role: string, token?: string | null): void;
    role: string,
    imageRef: React.RefObject<HTMLInputElement | null>;
    token?: string | null;
    handleImageUpload(imageFile: File): void;
    imageLoading: boolean;
    submitLoading: boolean;

}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit, role, imageRef, token, handleImageUpload, imageLoading, submitLoading }) => {

    const form = useForm<RegisterFormType>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            userName: "",
            email: "",
            image: null,
            role: "",
            contactNo: "",
            password: ""
        },
    })

    return (
        <Card className="w-full h-full max-h-fit overflow-y-auto  bg-gray-900 text-white ">
            {
                submitLoading ? <Spinner /> :
                    <><CardHeader>
                        <CardTitle>Register Your Account</CardTitle>
                    </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit((values) => onSubmit(values, form.reset, role, token))} className="w-full space-y-6">
                                    {/* <form className="w-full space-y-6"> */}

                                    <FormField
                                        control={form.control}
                                        name="image"
                                        render={({ field }) => (
                                            <FormItem className=' relative '>
                                                <FormLabel>Upload Profile Image</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Select Image"
                                                        // type="files"
                                                        type="file"
                                                        ref={imageRef}
                                                        // {...field}
                                                        onChange={e => {
                                                            const file = e.target.files?.[0]
                                                            if (!file) return
                                                            handleImageUpload(file)
                                                            field.onChange(e.target.files)
                                                        }}
                                                    />
                                                </FormControl>
                                                {imageLoading && <FormItem className='absolute right-2 top-0  '>
                                                    <Spinner className='w-5 h-5' />
                                                </FormItem>}
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="userName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>User Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter User name"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter Email" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="contactNo"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Contact No</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter Contact No" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter password" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        type="submit"
                                        className='bg-white text-black hover:bg-gray-400'
                                    >Submit</Button>
                                </form>
                            </Form>
                        </CardContent>
                        {role === 'admin' && <CardFooter className="flex-col gap-2 items-start ">
                            <p className='text-sm'>Already Have an Account,  <Link to='/auth/login' className='text-blue-500 underline'>Login</Link></p>
                        </CardFooter>}
                    </>
            }
        </Card>
    )
}

export default SignUpForm