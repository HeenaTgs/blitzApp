import { z } from "zod"

export const CreateQuestionSchema = z.object({
  text: z.string(),
  // template: __fieldName__: z.__zodType__(),
})
export const UpdateQuestionSchema = CreateQuestionSchema.merge(
  z.object({
    id: z.number(),
  })
)

export const DeleteQuestionSchema = z.object({
  id: z.number(),
})
