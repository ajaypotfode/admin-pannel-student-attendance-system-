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
import { adminTokenSchema, type AdminTokenFormType } from '@/schema/authFormSchema'


interface AdminTokenFormProps {
    onSubmit(adminToken: string, reset: () => void): void;
}

const AdminTokenForm: React.FC<AdminTokenFormProps> = ({ onSubmit }) => {

    const form = useForm<AdminTokenFormType>({
        resolver: zodResolver(adminTokenSchema),
        defaultValues: {
            adminToken: ''
        },
    })

    return (
        <div className="pt-5 px-5 h-screen flex">
            <div className="bg-white/10 backdrop-blur-lg flex-1 rounded-t-3xl overflow-hidden flex flex-col justify-center items-center">
                <Card className="w-full max-w-sm bg-gray-900 text-white">
                    <CardHeader>
                        <CardTitle>Enter Organazation Token</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit((values) => onSubmit(values.adminToken, form.reset))} className="w-full space-y-6">
                                {/* <form className="w-full space-y-6"> */}

                                <FormField
                                    control={form.control}
                                    name="adminToken"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Admin Token</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter Admin Token"
                                                    {...field}
                                                />
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
            </div>
        </div >
    )
}

export default AdminTokenForm