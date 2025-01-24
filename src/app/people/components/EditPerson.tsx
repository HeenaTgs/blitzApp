"use client"
import { Suspense } from "react"
import updatePerson from "../mutations/updatePerson"
import getPerson from "../queries/getPerson"
import { UpdatePersonSchema } from "../schemas"
import { FORM_ERROR, PersonForm } from "./PersonForm"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { useRouter } from "next/navigation"

export const EditPerson = ({ personId }: { personId: number }) => {
  const [person, { setQueryData }] = useQuery(
    getPerson,
    { id: personId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updatePersonMutation] = useMutation(updatePerson)
  const router = useRouter()
  return (
    <>
      <div>
        <h1>Edit Person {person.id}</h1>
        <pre>{JSON.stringify(person, null, 2)}</pre>
        <Suspense fallback={<div>Loading...</div>}>
          <PersonForm
            submitText="Update Person"
            schema={UpdatePersonSchema}
            initialValues={person}
            onSubmit={async (values) => {
              try {
                const updated = await updatePersonMutation({
                  ...values,
                  id: person.id,
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
