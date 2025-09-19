import { z } from "zod";

export const ClassFormSchema = z.object({
    className: z
        .string()
        .min(2, 'class Name Should be min 2 char')
        .nonempty('ClassName must be Required'),

    time: z
        .string()
        .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "invalid Time")
        .nonempty("Time must be required"),
    trainer: z
        .string()
        .nonempty('trainer must be Required')
})
