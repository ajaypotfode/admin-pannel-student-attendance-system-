
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
import { Link } from 'react-router-dom'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { LoginFormSchema, type LoginFormType } from '@/schema/authFormSchema'
import UseAuth from '@/hooks/useAuth'
// import { useAppSelector } from '@/redux/reduxHook'


const Login = () => {
    // const { loginData } = useAppSelector(state => state.auth)
    const { getUserLogin } = UseAuth()
    const form = useForm<LoginFormType>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })



    return (
        <div className="min-h-screen bg-gradient-to-bl to-gray-900 from-10% from-blue-950 to-40% w-full overflow-hidden">
            <div className="pt-5 px-5 h-screen flex">
                <div className="bg-white/10 backdrop-blur-lg flex-1 rounded-t-3xl overflow-hidden flex flex-col justify-center items-center">

                    <Card className="w-full max-w-sm bg-gray-900 text-white">
                        <CardHeader>
                            <CardTitle>Login to your account</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit((values) => getUserLogin(values, form.reset))} className="w-full space-y-6">
                                    {/* <form className="w-full space-y-6"> */}
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
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
                                    <Button type="submit" className="bg-white text-black hover:bg-gray-400">Submit</Button>
                                </form>
                            </Form>
                        </CardContent>
                        <CardFooter className="flex-col gap-2 items-start ">
                            <p className='text-sm'>Don't have Account then,  <Link to='/auth/signup' className='text-blue-500 underline'>Signup</Link></p>
                        </CardFooter>
                    </Card>

                </div>
            </div>
        </div>
    )
}

export default Login