import { Metadata } from "next"
import { Suspense } from "react"
import { invoke } from "src/app/blitz-server"
import getPerson from "../../queries/getPerson"
import { EditPerson } from "../../components/EditPerson"

type EditPersonPageProps = {
  params: Promise<{ personId: string }>
}

export async function generateMetadata(props: EditPersonPageProps): Promise<Metadata> {
  const params = await props.params
  const Person = await invoke(getPerson, { id: Number(params.personId) })
  return {
    title: `Edit Person ${Person.id} - ${Person.name}`,
  }
}

export default async function Page(props: EditPersonPageProps) {
  const params = await props.params
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditPerson personId={Number(params.personId)} />
      </Suspense>
    </div>
  )
}
