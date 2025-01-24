"use client"
import { FORM_ERROR, PersonForm } from "./PersonForm"
import { CreatePersonSchema } from "../schemas"
import { useMutation } from "@blitzjs/rpc"
import createPerson from "../mutations/createPerson"
import { useRouter } from "next/navigation"

export function New__ModelName() {
  const [createPersonMutation] = useMutation(createPerson)
  const router = useRouter()
  return (
    <PersonForm
      submitText="Create Person"
      schema={CreatePersonSchema}
      onSubmit={async (values) => {
        try {
          const person = await createPersonMutation(values)
          router.push(`/people/${person.id}`)
        } catch (error: any) {
          console.error(error)
          return {
            [FORM_ERROR]: error.toString(),
          }
        }
      }}
    />
  )
}
