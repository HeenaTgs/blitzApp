import { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { invoke } from "src/app/blitz-server"
import getPerson from "../queries/getPerson"
import { Person } from "../components/Person"

export async function generateMetadata(props: PersonPageProps): Promise<Metadata> {
  const params = await props.params
  const Person = await invoke(getPerson, { id: Number(params.personId) })
  return {
    title: `Person ${Person.id} - ${Person.name}`,
  }
}

type PersonPageProps = {
  params: Promise<{ personId: string }>
}

export default async function Page(props: PersonPageProps) {
  const params = await props.params
  return (
    <div>
      <p>
        <Link href={"/persons"}>Persons</Link>
      </p>
      <Suspense fallback={<div>Loading...</div>}>
        <Person personId={Number(params.personId)} />
      </Suspense>
    </div>
  )
}
