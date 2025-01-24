"use client"
import { useMutation, useQuery } from "@blitzjs/rpc"
import Link from "next/link"
import { useRouter } from "next/navigation"
import deleteQuestion from "../mutations/deleteQuestion"
import getQuestion from "../queries/getQuestion"

export const Question = ({ questionId }: { questionId: number }) => {
  const router = useRouter()
  const [deleteQuestionMutation] = useMutation(deleteQuestion)
  const [question] = useQuery(getQuestion, { id: questionId })

  return (
    <>
      <div>
        <h1>Project {question.id}</h1>
        <pre>{JSON.stringify(question, null, 2)}</pre>

        <Link href={`/questions/${question.id}/edit`}>Edit</Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteQuestionMutation({ id: question.id })
              router.push("/questions")
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}
