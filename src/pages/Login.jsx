import { useForm } from 'react-hook-form';
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardFooter,
} from "@/components/ui/card";
import { Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import api from '../api/axios';

const formSchema =z.object({
    email: z.string().email().min(5, "Must be at least 5 characters"),
    password: z.string().min(8, "Must be at least 8 characters")
})

const Login = () => {

    const form = useForm({
        resolver: zodResolver(formSchema),//for validation,resolver is used to integrate zod with react-hook-form
        defaultValues: {//default values for the form fields
            email: "",
            password: ""
        }
    })

    const onSubmit =async (data) => { //for what to submit the form data
        console.log(data);
         try { 
       
      const response = await api.post("/auth/login", data);

      if (response.data === 200) {
           toast.success("Login successful");
      } else {
          toast.error(response.message || "Login failed");
        }

    } catch (error) {
      console.error(error.message || "Some error occured");
      console.log(error.message);

    }
  }

  return (
    // for image
    <div className="w-full h-dvh pt-20 bg-white"> 
       {/* for form */}
        <div className="w-1/2 mx-auto bg-white mt-20 rounded-lg grid grid-cols-2 h-90dvh"> 
            {/* for left side of the form */}
            <div className="w-full overflow-hidden ">
                <img src="/login.png" alt="Login_bg"  />
            </div>
           <div>
            <form className="h-full" onSubmit={form.handleSubmit(onSubmit)}>
              <Card className="h-full flex flex-col justify-evenly"> 
                <CardHeader>
                  <CardTitle>Login to WanderWise</CardTitle>
                  <CardDescription>Enter your credentials to continue</CardDescription>
                  <CardAction>
                    <img src="/logo.png" alt="Logo" className="w-12 " />
                  </CardAction>
                </CardHeader>

                <CardContent className="space-y-2">
                  <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Enter your email</FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          type="email"
                          placeholder="roman.reigns@example.com"
                          aria-invalid={fieldState.invalid}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Enter your password</FieldLabel>
                        <Input
                          {...field}
                          id={field.name}
                          type="password"
                          placeholder="********"
                          aria-invalid={fieldState.invalid}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="h-4 w-4 rounded border-border" />
                      Remember me
                    </label>
                    <a href="/register" className="text-primary hover:underline">
                      Create account
                    </a>
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col gap-3">
                  <Button className="w-full" type="submit">Login</Button>
                  <p className="text-center text-sm text-muted-foreground">
                    Need an account? <a href="/register" className="font-medium text-primary hover:underline">Sign up</a>
                  </p>
                </CardFooter>
              </Card>
            </form>
           </div>
        </div>

    </div>
  )
}


export default Login
