import { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { QuestionsList } from "./components/QuestionsList"

export const metadata: Metadata = {
  title: "Questions",
  description: "List of questions",
}

export default function Page() {
  return (
    <div>
      <p>
        <Link href={"/questions/new"}>Create Question</Link>
      </p>
      <Suspense fallback={<div>Loading...</div>}>
        <QuestionsList />
      </Suspense>
    </div>
  )
}
