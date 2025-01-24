"use client"
import { Suspense } from "react"
import updateQuestion from "../mutations/updateQuestion"
import getQuestion from "../queries/getQuestion"
import { UpdateQuestionSchema } from "../schemas"
import { FORM_ERROR, QuestionForm } from "./QuestionForm"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { useRouter } from "next/navigation"

export const EditQuestion = ({ questionId }: { questionId: number }) => {
  const [question, { setQueryData }] = useQuery(
    getQuestion,
    { id: questionId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateQuestionMutation] = useMutation(updateQuestion)
  const router = useRouter()
  return (
    <>
      <div>
        <h1>Edit Question {question.id}</h1>
        <pre>{JSON.stringify(question, null, 2)}</pre>
        <Suspense fallback={<div>Loading...</div>}>
          <QuestionForm
            submitText="Update Question"
            schema={UpdateQuestionSchema}
            initialValues={question}
            onSubmit={async (values) => {
              try {
                const updated = await updateQuestionMutation({
                  ...values,
                  id: question.id,
                })
                await setQueryData(updated)
                router.refresh()
              } catch (error: any) {
                console.error(error)
                return {
                  [FORM_ERROR]: error.toString(),
                }
              }
            }}
          />
        </Suspense>
      </div>
    </>
  )
}
