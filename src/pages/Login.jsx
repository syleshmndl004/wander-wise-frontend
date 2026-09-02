import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Field, FieldError, FieldLabel } from "../components/ui/field";
import { Input } from "../components/ui/input";
import api from "../api/axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  email: z.string().email().min(5, "Must be atleast 5 characters").trim(),
  password: z.string().min(8, "Must be atleast 8 characters").trim(),
});

const Login = () => {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await api.post("/auth/login", data);

      if (response.status === 200){
        toast.success("Login successfully")
        navigate("/dashboard");
      }else{
        toast.error( response.message || "Login failed");
      }

    } catch (error) {
      toast.error(error.message || "Some error occured");
      console.log(error.message)
    }
  };

  return (
    <div className="w-full h-dvh p-30 bg-emerald-800">
      <div
        className="w-1/2 mx-auto bg-white mt-20 rounded-lg grid grid-cols-2 
        h-60dvh"
      >
        <div className="w-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1612031326777-1391836af889?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbCUyMG5lcGFsfGVufDB8MXwwfHx8MA%3D%3D"
            alt="wanderwise login page"/>
        </div>

        <div>
          <form className="h-full" onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="h-full flex flex-col justify-evenly">
              <CardHeader>
                <CardTitle>Login to Wanderwise</CardTitle>
                <CardDescription>
                  Enter your credentials to continue.
                </CardDescription>
                <CardAction>
                  <img
                    src="/logo.png"
                    alt="wanderwise Logo.png"
                    className="w-12"
                  />
                </CardAction>
              </CardHeader>

              <CardContent className="space-y-4">
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        Enter your email
                      </FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        type="email"
                        placeholder="johndoe@example.com"
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
                      <FieldLabel htmlFor={field.name}>
                        Enter your password
                      </FieldLabel>
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
              </CardContent>

              <CardFooter>
                <CardFooter className="flex flex-col gap-3 w-full">
                  <Button className="w-full" type="submit">Login</Button>
                  <p className="text-center text-sm text-muted-foreground">
                    Need an account? <a href="/register" className="font-medium text-primary hover:underline">Sign up</a>
                  </p>
                </CardFooter>
              </CardFooter>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;