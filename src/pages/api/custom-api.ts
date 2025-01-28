import { NextApiRequest, NextApiResponse } from "next"
import db from "db"

export default async function GetQuestions(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const question = await db.$queryRaw`
        CALL GetQuestions();
      `
      // res.status(200).json({ question });
      return question
    } catch (error) {
      res.status(500).json({ error: "Something went wrong!" })
    }
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
