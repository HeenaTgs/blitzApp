import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreatePersonSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreatePersonSchema),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const person = await db.person.create({ data: input })

    return person
  }
)
