import { useState } from "react";
import Navbar from "../components/common/Navbar";
import { Button } from "../components/ui/button";
// import {
//   HoverCard,
//   HoverCardContent,
//   HoverCardTrigger,
// } from "@/components/ui/hover-card";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log("contact update:", name, value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("contact form submitted", formData);
  };

  return (
    <div className="space-y-10 pb-20">
      <Navbar />

      {/*
       <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 lg:flex-row">
        <div className="flex-1 space-y-6">
          <Button>Button</Button>
          <Button variant="destructive">clickme</Button>

          <HoverCard>
            <HoverCardTrigger>Hover</HoverCardTrigger>
            <HoverCardContent>
              <img src="/heroImage.png" alt="Scenic travel photo" />
            </HoverCardContent>
          </HoverCard>
        </div> 
        */}

        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>
              <h1 className="font-bold">Trip Details</h1>
              <h2>Create new trip</h2>
            </CardTitle>
            <CardDescription>
              <img src="/heroImage.png" alt="Trip cover" className="mt-2 rounded-md" />
              <p className="mt-2">Mountains</p>
            </CardDescription>
            <CardAction>Card Action</CardAction>
          </CardHeader>
          <CardContent>
            <p>
              A mountain is a very tall, steep natural landform that rises high above the surrounding
              ground and often ends in a sharp peak.
            </p>
            <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full rounded border border-border px-3 py-2"
              />
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
                className="w-full rounded border border-border px-3 py-2"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your trip"
                className="min-h-24 w-full rounded border border-border px-3 py-2"
              />
            </form>
          </CardContent>
          <CardFooter>
            <Button type="submit" onClick={handleSubmit}>Book Now</Button>
          </CardFooter>
        </Card>
      </div>
  );
};

export default Contact;