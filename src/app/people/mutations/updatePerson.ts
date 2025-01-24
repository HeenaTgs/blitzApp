import { resolver } from "@blitzjs/rpc"
import db from "db"
import { UpdatePersonSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(UpdatePersonSchema),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const person = await db.person.update({ where: { id }, data })

    return person
  }
)
