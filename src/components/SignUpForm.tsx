import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
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


interface SignUpFormProps {
    onSubmit(data: RegisterFormType, reset: () => void, role: string): void;
    role: string,
    imageRef: React.RefObject<HTMLInputElement | null>

}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit, role, imageRef }) => {


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
        <Card className="w-full h-full bg-gray-900 text-white overflow-y-auto scrollbar-hidden">
            <CardHeader>
                <CardTitle>Register Your Account</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit((values) => onSubmit(values, form.reset, role))} className="w-full space-y-6">
                        {/* <form className="w-full space-y-6"> */}

                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="shadcn"
                                            // type="files"
                                            type="file"
                                            ref={imageRef}
                                            // {...field}
                                            onChange={e => field.onChange(e.target.files)}
                                        />
                                    </FormControl>
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
                                            placeholder="shadcn"
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
                                        <Input placeholder="shadcn" {...field} />
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
                                        <Input placeholder="shadcn" {...field} />
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
                                        <Input placeholder="shadcn" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className='bg-white text-black hover:bg-gray-400'>Submit</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default SignUpForm