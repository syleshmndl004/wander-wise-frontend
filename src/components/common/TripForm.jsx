
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card'
import { Field, FieldLabel } from '../ui/field'
import { Textarea } from '../ui/textarea'

const budgetSchema = z.object({
    total: z.number().min(1, "Budget must be atleast 1"),
    spent: z.number().optional(),
})

const formSchema = z.object({
    title: z.string().min(5, "Must be atleast 5 characters"),
    description: z.string().optional(),
    startDate: z.date(),
    endDate: z.date(),
    destination: z.array(
      z.string()).min(3, "Must be atleast 3 characters"
      ).min(1, "Atleast one destination is required"),  
    budget: budgetSchema,   
}).refine((data) => data.startDate <= data.endDate, {
    message: "Start date must be before end date",
    path: ["startDate"], // path of error
})

const TripForm = () => {
  //logic for trip form will be here
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date().toISOString().split("T")[0],
      destination: [],
      budget: {
        total: 0,
        spent: 0,
      },
    },
  })

  const onSubmit = (data) => {
    console.log(data);
  }
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>

      <Card>
        <CardHeader>
          <CardTitle>Add Your Trip</CardTitle>
          <CardDescription>Fill in the details of your trip</CardDescription>
        </CardHeader> 

        <CardContent>
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Enter your trips title</FieldLabel>
                <Textarea
                  {...field}
                  id={field.name}
                  type="text"
                  placeholder="My Trip"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </CardContent>
      </Card>
    </form>
  )
}

export default TripForm