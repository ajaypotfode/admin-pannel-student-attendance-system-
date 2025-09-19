
// import { Button } from "@/components/ui/button"
// import {
//     Card,
//     CardContent,
//     CardFooter,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// // import { Label } from "@/components/ui/label"
// import { Link } from 'react-router-dom'
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form"
// import { registerFormSchema, type LoginFormType, type RegisterFormType } from '@/schema/authFormSchema'
import SignUpForm from "@/components/SignUpForm"
import UseAuth from "@/hooks/useAuth"
// import { useAppSelector } from '@/redux/reduxHook'


const RegistrationForm = () => {
    // const { loginData } = useAppSelector(state => state.auth)
    const { getUserRegister, imageRef } = UseAuth()

    // const form = useForm<RegisterFormType>({
    //     resolver: zodResolver(registerFormSchema),
    //     defaultValues: {
    //         userName: "",
    //         email: "",
    //         image: null,
    //         role: 'student',
    //         contactNo: "",
    //         password: ""
    //     },
    // })

    // function onSubmit(data: RegisterFormType) {
    //     getUser
    //     // console.log("SignupForm Data Is :", data);
    //     // console.log("SignupForm Data Is :", data.image);
    //     // form.
    //     //    console.log("form Value :", form.getValues());

    //     form.reset()
    // }

    return (
        <div className="min-h-screen bg-gradient-to-bl to-gray-900 from-10% from-blue-950 to-40% w-full overflow-hidden">
            <div className="pt-5 px-5 h-screen flex">
                <div className="bg-white/10 backdrop-blur-lg flex-1 rounded-t-3xl overflow-hidden flex flex-col justify-center items-center">
                    <div className="overflow-hidden max-w-lg h-[90%] w-full">
                        <SignUpForm onSubmit={getUserRegister} role={'student'} imageRef={imageRef} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegistrationForm