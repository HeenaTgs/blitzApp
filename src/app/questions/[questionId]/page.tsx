import { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { invoke } from "src/app/blitz-server"
import getQuestion from "../queries/getQuestion"
import { Question } from "../components/Question"

export async function generateMetadata(props: QuestionPageProps): Promise<Metadata> {
  const params = await props.params
  const Question = await invoke(getQuestion, { id: Number(params.questionId) })
  return {
    title: `Question ${Question.id} - ${Question.name}`,
  }
}

type QuestionPageProps = {
  params: Promise<{ questionId: string }>
}

export default async function Page(props: QuestionPageProps) {
  const params = await props.params
  return (
    <div>
      <p>
        <Link href={"/questions"}>Questions</Link>
      </p>
      <Suspense fallback={<div>Loading...</div>}>
        <Question questionId={Number(params.questionId)} />
      </Suspense>
    </div>
  )
}
