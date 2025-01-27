import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdateQuestionSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdateQuestionSchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // Using a transaction to update the question
    const result = await db.$transaction(async (prisma) => {
      // Update the question
      const question = await prisma.question.update({
        where: { id },
        data,
      })

      return question // Return the updated question
    })

    return result
  }
)
