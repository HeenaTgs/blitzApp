import { z } from "zod"

export const CreatePersonSchema = z.object({
  name: z.string(),
  age: z.string(),
  isActive: z.boolean(),
  startDate: z.string().datetime(),
  name: z.string(),
  age: z.number(),
  isActive: z.boolean(),
  startDate: z.string().datetime(),
  // template: __fieldName__: z.__zodType__(),
})
export const UpdatePersonSchema = CreatePersonSchema.merge(
  z.object({
    id: z.number(),
  })
)

export const DeletePersonSchema = z.object({
  id: z.number(),
})
