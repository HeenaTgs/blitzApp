import { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { QuestionsList } from "./components/QuestionsList"
import Common from "../components/Common"

export const metadata: Metadata = {
  title: "Questions",
  description: "List of questions",
}

export default function Page() {
  return (
    <div>
      <Common />
      <p>
        <Link href={"/questions/new"}>Create Question</Link>
      </p>
      <Suspense fallback={<div>Loading...</div>}>
        <QuestionsList />
      </Suspense>
    </div>
  )
}
