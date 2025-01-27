import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

interface GetQuestionsInput
  extends Pick<Prisma.QuestionFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetQuestionsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: questions,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.question.count({ where }),
      query: (paginateArgs) => db.question.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      questions,
      nextPage,
      hasMore,
      count,
    }
  }
)

// import { resolver } from "@blitzjs/rpc";
// import db from "db";

// export default resolver.pipe(
//   resolver.authorize(), // Ensure authorization
//   async () => {
//     // Call the stored procedure using Prisma's $queryRaw
//     const question = await db.$queryRaw`
//       CALL GetQuestions();
//     `;
//     return question; // Return the result from the stored procedure
//   }
// );
