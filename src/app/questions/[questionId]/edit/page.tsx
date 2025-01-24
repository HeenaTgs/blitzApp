import { Metadata } from "next"
import { Suspense } from "react"
import { invoke } from "src/app/blitz-server"
import getQuestion from "../../queries/getQuestion"
import { EditQuestion } from "../../components/EditQuestion"

type EditQuestionPageProps = {
  params: Promise<{ questionId: string }>
}

export async function generateMetadata(props: EditQuestionPageProps): Promise<Metadata> {
  const params = await props.params
  const Question = await invoke(getQuestion, { id: Number(params.questionId) })
  return {
    title: `Edit Question ${Question.id} - ${Question.name}`,
  }
}

export default async function Page(props: EditQuestionPageProps) {
  const params = await props.params
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditQuestion questionId={Number(params.questionId)} />
      </Suspense>
    </div>
  )
}
