import React from 'react'
import { Controller, useForm, useFieldArray } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Field, FieldError, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import api from '../../api/axios'
import { toast } from 'sonner'

const formSchema = z.object({
  collaborators: z.array(
    z.string().email("Enter a valid email")
  ).min(1, "Must contain at least one email")
})

const InviteForm = ({ trip }) => {

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      collaborators: ['']
    }
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "collaborators"
  })

  const onSubmit = async (data) => {
    try {
      const response = await api.post(`/trips/${trip._id}/invite`, {collaboratorEmails: data.collaborators});

      if (response.status === 200) {
        toast.success("invited successfully");
        form.reset();
      } else {
        toast.error("Error while inviting user");
      }
    } catch (error) {
      toast.error(error.message || "Error while inviting user");
      console.log(error);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Invite Collaborators</CardTitle>
          <CardDescription>Enter email address of collaborators</CardDescription>
          <CardAction>
            <Button type="button" onClick={() => append('')}>Add email</Button>
          </CardAction>
        </CardHeader>

        <CardContent className="space-y-2">
          {fields.map((item, index) => (
            <Controller
              key={item.id}
              name={`collaborators.${index}`}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Enter email</FieldLabel>
                  <div className="flex gap-2">
                    <Input
                      {...field}
                      id={field.name}
                      type="email"
                      placeholder="abc@gmail.com"
                      aria-invalid={fieldState.invalid}
                    />
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => remove(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          ))}
        </CardContent>

        <CardFooter>
          <Button className="w-full" type="submit">Submit</Button>
        </CardFooter>
      </Card>
    </form>
  )
}

export default InviteForm