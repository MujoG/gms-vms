import React from "react";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "../ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type Props = {
  open?: any;
  onOpenChange?: any;
  registrationPlate?: string;
  vehicle?: string;
};

const item = {
  id: 1,
  vehicle: "Golf 7",
  vehicleYear: "2015",
  fuelType: "Diesel",
  registrationPlate: "F-AG 1243",
  mileage: 1234,
  inRide: false,
  vehicleData: {
    mileageMonth: 1250,
    gasMonth: "250e",
    ridesMonth: "5",
    costKm: "1.4E",
    inRide: false,
    image: "/golf.jpg",
  },
};

const formSchema = z.object({
  serviceDescription: z.string().min(10, {
    message: "Username must be at least 10 characters.",
  }),
  responsiblePerson: z.string().min(2, {
    message: "responsiblePerson for this service",
  }),
  serviceMileage: z.string().min(2, {
    message: "serviceMileage for this service",
  }),
  serviceDate: z.string().min(2, {
    message: "serviceMileage for this service",
  }),
});

function CreateServiceWrapper({
  open,
  onOpenChange,
  vehicle,
  registrationPlate,
}: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serviceDescription: "",
      responsiblePerson: "",
      serviceMileage: "",
      serviceDate: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Add New Service</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <span className="text-xl">
                Add new service for {vehicle ? "for" + vehicle : null}{" "}
                {registrationPlate ? registrationPlate : null}
              </span>
            </DialogTitle>
          </DialogHeader>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="serviceDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>serviceDescription</FormLabel>
                      <FormControl>
                        <Input placeholder="serviceDescription" {...field} />
                      </FormControl>
                      <FormDescription>
                        short serviceDescription
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="responsiblePerson"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>responsiblePerson</FormLabel>
                      <FormControl>
                        <Input placeholder="responsiblePerson" {...field} />
                      </FormControl>
                      <FormDescription>
                        Who is resposible for this Service?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="serviceMileage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>serviceMileage</FormLabel>
                      <FormControl>
                        <Input placeholder="serviceMileage" {...field} />
                      </FormControl>
                      <FormDescription>
                        Mileage on the service day?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="serviceMileage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>serviceMileage</FormLabel>
                      <FormControl>
                        <Input placeholder="serviceMileage" {...field} />
                      </FormControl>
                      <FormDescription>
                        Mileage on the service day?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div
                  className="flex gap-5
              justify-end
              "
                >
                  <Button type="submit" className="bg-[#47989c]">
                    Submit
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateServiceWrapper;
