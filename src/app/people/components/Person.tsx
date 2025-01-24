"use client"
import { useMutation, useQuery } from "@blitzjs/rpc"
import Link from "next/link"
import { useRouter } from "next/navigation"
import deletePerson from "../mutations/deletePerson"
import getPerson from "../queries/getPerson"

export const Person = ({ personId }: { personId: number }) => {
  const router = useRouter()
  const [deletePersonMutation] = useMutation(deletePerson)
  const [person] = useQuery(getPerson, { id: personId })

  return (
    <>
      <div>
        <h1>Project {person.id}</h1>
        <pre>{JSON.stringify(person, null, 2)}</pre>

        <Link href={`/people/${person.id}/edit`}>Edit</Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deletePersonMutation({ id: person.id })
              router.push("/people")
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
