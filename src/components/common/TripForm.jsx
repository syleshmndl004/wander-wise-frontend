
import React from 'react'
import * as z from 'zod'

const formSchema = z.object({
    title: z.string().min(5, "Must be atleast 5 characters"),
    description: z.string().optional(),
})

const TripForm = () => {
  return (
    <div>TripForm</div>
  )
}

export default TripForm