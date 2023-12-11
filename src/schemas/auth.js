import { z } from "zod"

export const loginSchema = z.object({
    phone: z.string().min(1, {
        message: "*El celular ingresado no es válido"
    })
})
