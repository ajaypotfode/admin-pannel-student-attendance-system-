import AddNotification from '@/components/AddNotification'
import NotificationSkeleton from '@/components/Spinner'
import { Card, CardContent } from '@/components/ui/card'
import UseNotificationData from '@/hooks/useNotificationData'
import { format } from 'date-fns'
import { MessageSquareText, Trash2 } from 'lucide-react'
import { useEffect } from 'react'

const Notification = () => {
    const { addNewNotification, fetchNotifications, getDeleteNotification, notifications, loading } = UseNotificationData()

    useEffect(() => {
        fetchNotifications()
    }, [])

    return (
        <div className="w-full h-full overflow-y-auto scrollbar-hidden">
            <h1 className="smallsc1:text-4xl text-2xl text-white font-bold ml-6 mt-4">Notification</h1>
            <div className="w-full p-11 pt-0 ">
                <div className='flex w-full justify-end '>
                    <AddNotification addNotification={addNewNotification} />
                </div>
                {
                    loading['getNotification'] ? <NotificationSkeleton />
                        : (notifications.map((notification) => (
                            <div className="relative pl-8 pt-4 pb-6 border-l-2 border-gray-300 " key={notification._id}>
                                <div className="absolute -left-6 -top-1 bg-gray-900 text-white rounded px-3 py-1 text-xs whitespace-nowrap">
                                    {
                                        format(notification.createdAt, 'dd-MM-yyyy HH:mm')
                                    }
                                </div>
                                <div className="absolute -left-[16px] top-[48px] bg-white rounded-full border-2 border-gray-400 p-1">
                                    <MessageSquareText className="w-4 h-4 text-gray-900" />
                                </div>
                                <Card className="ml-2 mt-4 bg-gray-900 relative">
                                    <div className='xl:text-lg text-md text-white absolute top-0 right-3 cursor-pointer' onClick={() => getDeleteNotification(notification._id)} >
                                        <Trash2 />
                                    </div>
                                    <CardContent className=" px-3">
                                        <h4 className="text-white font-semibold text-sm mb-1">
                                            {notification.heading}
                                        </h4>
                                        <p className="text-sm text-gray-300">
                                            {notification.details}
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        )))
                }
            </div>
        </div>
    )
}

export default Notification