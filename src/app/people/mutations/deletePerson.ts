import { resolver } from "@blitzjs/rpc"
import db from "db"
import { DeletePersonSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(DeletePersonSchema),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const person = await db.person.deleteMany({ where: { id } })

    return person
  }
)
