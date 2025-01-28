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

// Call the stored procedure

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

// Call the database function

// export default resolver.pipe(
//   resolver.authorize(),
//   async ({ number }: { number: number }) => {
//     const result = await db.$queryRaw`
//       SELECT SquareNumber(${number}) AS squared;
//     `;

//     return result[0]; // Return the result
//   }
// );

// api calling using common api
// import { resolver } from "@blitzjs/rpc";
// import { fetchQuestions } from "@/src/utils/dbUtils";

// export default resolver.pipe(
//   resolver.authorize(), // Ensure authorization
//   async () => {
//     const questions = await fetchQuestions(); // Use the reusable function
//     console.log('Questions from Resolver 1:', questions);
//     return questions;
//   }
// );
