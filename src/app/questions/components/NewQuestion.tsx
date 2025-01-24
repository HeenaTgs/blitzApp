"use client"
import { FORM_ERROR, QuestionForm } from "./QuestionForm"
import { CreateQuestionSchema } from "../schemas"
import { useMutation } from "@blitzjs/rpc"
import createQuestion from "../mutations/createQuestion"
import { useRouter } from "next/navigation"

export function New__ModelName() {
  const [createQuestionMutation] = useMutation(createQuestion)
  const router = useRouter()
  return (
    <QuestionForm
      submitText="Create Question"
      schema={CreateQuestionSchema}
      onSubmit={async (values) => {
        try {
          const question = await createQuestionMutation(values)
          router.push(`/questions/${question.id}`)
        } catch (error: any) {
          console.error(error)
          return {
            [FORM_ERROR]: error.toString(),
          }
        }
      }}
    />
  )
}
