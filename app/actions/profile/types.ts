
import { z } from 'zod'
import { profileIdSchema } from './schema'
export type profileIdType = z.infer<typeof profileIdSchema>