// const dateField
import { z } from 'zod'


export const NotificationSchema = z.object({
    details: z
        .string()
        .nonempty("Details Is Required"),
    heading: z
        .string()
        .nonempty("Heading Is Important")
})