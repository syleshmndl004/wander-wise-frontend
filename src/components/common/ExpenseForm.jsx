import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Field, FieldError, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import api from '../../api/axios'
import { toast } from 'sonner'

const formSchema = z.object({
    name: z.string().min(3, "Must be atleast three characters"),
    amount: z.coerce.number().min(1, "Must be atleast one digit")
})

const ExpenseForm = ({trip}) => {

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            amount: ""
        }
    })

    const onSubmit = async (data) => {

        const budget = {
            
            ...trip.budget,
            spent: trip.budget.spent + data.amoumt,
            expense:[
                ...trip.budget.expense,
                {
                    name:data.name,
                    amount:data.amount
                }
            ]
        }
        console.log(data);

        try {
            const response = await api.patch(`/trips/${trip._id}`,{budget});

            if(response.status === 200){
                toast.success("Expense added sucessfully");
                window.location.reload();

            } else{
                toast.error("Error while adding expense");
            }
        } catch(error){
            toast.error(error.message || "Error while addiing expnese");
            console.log(error);
        }

    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card>
                <CardHeader className="border-b">
                    <CardTitle>Add Expenses</CardTitle>
                    <CardDescription>Enter the name and amount of expense</CardDescription>
                </CardHeader>

                <CardContent className="space-y-2">
                    <Controller
                        name="name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>Enter expense name</FieldLabel>
                                <Input
                                    {...field}
                                    id={field.name}
                                    type="text"
                                    placeholder="Ticket"
                                    aria-invalid={fieldState.invalid}
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    <Controller
                        name="amount"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>Enter expense amount</FieldLabel>
                                <Input
                                    {...field}
                                    id={field.name}
                                    type="number"
                                    placeholder="2000"
                                    aria-invalid={fieldState.invalid}
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                </CardContent>

                <CardFooter>
                    <Button className="w-full" type="submit">submit</Button>
                </CardFooter>
            </Card>
        </form>
    )
}

export default ExpenseForm