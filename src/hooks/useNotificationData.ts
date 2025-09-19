import { useAppDispatch, useAppSelector } from "@/redux/reduxHook"
import { addNotifications, deleteNotifications, getNotifications } from "@/redux/slice/notificationSlice"
import type { NotificationData } from "@/types/NotificationType"

const UseNotificationData = () => {

    const dispatch = useAppDispatch()
    const { notifications } = useAppSelector(state => state.notification)
    const { loading } = useAppSelector(state => state.common)

    const fetchNotifications = () => {
        dispatch(getNotifications())
    }


    const addNewNotification = async (data: NotificationData, reset: () => void) => {
        const response = await dispatch(addNotifications(data)).unwrap();

        if (response.success) {
            reset()
        }
    }

    const getDeleteNotification = (notificationId: string) => {
        dispatch(deleteNotifications(notificationId))
    }

    return {
        fetchNotifications,
        getDeleteNotification,
        addNewNotification,
        notifications,
        loading
    }
}

export default UseNotificationData