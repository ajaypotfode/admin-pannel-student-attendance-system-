import {
    Dialog,
    // DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Button } from './ui/button'
import { Input } from './ui/input'
import type { NotificationData } from "@/types/NotificationType"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { NotificationSchema } from "@/schema/notificationSchema"


interface AddNotificationProps {
    addNotification(data: NotificationData, reset: () => void): void
}

const AddNotification: React.FC<AddNotificationProps> = ({ addNotification }) => {

    const form = useForm<NotificationData>({
        resolver: zodResolver(NotificationSchema),
        defaultValues: {
            heading: "",
            details: ""
        },
    })


    return (
        <Dialog >
            <form>
            <DialogTrigger asChild>
                <Button variant="outline" className='xl:text-md text-[12px] bg-white text-black hover:bg-gray-400'>Add Notification+</Button>
            </DialogTrigger>
            <DialogContent className=" w-[800px] bg-gray-900 border border-gray-500 text-white ">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Add Class</DialogTitle>
                    <DialogDescription>
                        Mention A New Class
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit((values) => addNotification(values, form.reset))} className="w-full space-y-6">
                        {/* <form className="w-full space-y-6"> */}

                        <FormField
                            control={form.control}
                            name="heading"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter Notification Title"
                                            // type="files"
                                            {...field}

                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="details"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter Notification Description"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="bg-white text-black hover:bg-gray-400" >Add Notification</Button>
                    </form>
                </Form>
            </DialogContent>
            </form>
        </Dialog>
    )
}

export default AddNotification