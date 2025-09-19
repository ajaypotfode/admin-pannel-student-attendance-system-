export type NotificationData = {
    heading: string,
    details: string
}

interface CommonResponse {
    message: string,
    success: boolean,
    error?: unknown
}

type NotificationType = {
    heading: string,
    details: string,
    _id: string,
    _v: number,
    createdAt: string,
    updatedAt: string
}

export interface GetNotificationListResponse extends CommonResponse {
    result?: NotificationType[]
}

export interface GetNotificationResponse extends CommonResponse {
    result?: NotificationType
}

export interface NotificationInitialState {
    notifications: NotificationType[],
    // notificationData: NotificationData
}