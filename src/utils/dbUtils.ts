// utils/dbUtils.ts
import db from "db"

// Abstracted function to fetch questions from the database
export async function fetchQuestions() {
  try {
    const question = await db.$queryRaw`
      CALL GetQuestions();
    `
    return question
  } catch (error) {
    throw new Error("Something went wrong while fetching questions")
  }
}
