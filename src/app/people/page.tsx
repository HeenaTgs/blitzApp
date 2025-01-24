import { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { PeopleList } from "./components/PeopleList"

export const metadata: Metadata = {
  title: "People",
  description: "List of people",
}

export default function Page() {
  return (
    <div>
      <p>
        <Link href={"/people/new"}>Create Person</Link>
      </p>
      <Suspense fallback={<div>Loading...</div>}>
        <PeopleList />
      </Suspense>
    </div>
  )
}
