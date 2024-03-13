import React from "react";
import { Button } from "../ui/button";

type Props = {
  setNewDetail: any;
  newDetail: any;
  setOpen: any;
  open: any;
  setPins: any;
  tempPins: any;
  setPinId: any;
  pinId: any;
  setTempPin: any;
  pins: any;
  setTempPins: any;
  pinType: any;
  planeId: any;
};

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import DialogWrapper from "../allaround/DialogWrapper";
import { Pin } from "./PlanViewer";
import { trpc } from "@/trpc/client";
import { useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  label: z.string().min(1, {
    message: "Label must be at least 1 character.",
  }),
  orientation: z.string().min(1, {
    message: "Label must be at least 1 character.",
  }),
});

function NewSectionForm({
  setNewDetail,
  newDetail,
  setOpen,
  open,
  tempPins,
  setPinId,
  pinId,
  setPins,
  pins,
  setTempPin,
  setTempPins,
  pinType,
  planeId,
}: Props) {
  const [detailFromProject, setDetailFromProject] = React.useState(false);

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: "",
      orientation: "right",
    },
  });

  const { mutate: createNewDetail, isError: isCreateNewDetailError } =
    trpc.createNewDetail.useMutation({
      onSuccess: (newDetailData) => {
        console.log("Success from mutate createNewDetail:", newDetailData);
        queryClient.invalidateQueries(["getPlaneDetails", planeId]);

      },
      onError: (error) => {
        console.error("Error from mutate createNewDetail:", error);
      },
    });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      let x = tempPins.start.x;
      let y = tempPins.start.y;
      let x2 = tempPins.end.x2;
      let y2 = tempPins.end.y2;

      let label = values.label;
      let direction = values.orientation;
      let detailType = pinType;

      let PlaneId = planeId;

      const newPin: any = {
        X: x,
        Y: y,
        X2: x2,
        Y2: y2,
        DetailType: detailType,
        DetailLabel: label,
        DetailDirection: direction,
        PlaneId: PlaneId,
      };

      // Call the createNewDetail mutation
      await createNewDetail({
        newPin,
      });

      // Update the UI or perform any other actions after creating the new detail
      setPins([...pins, newPin]);
      setPinId(pinId + 1);

      console.log("mujo", values, pinType);

      setTempPin({});
      setTempPins({});
      setOpen(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle the error as needed
    }
  }

  console.log("mujsso", planeId);

  return (
    <div>
      <DialogWrapper open={open} onOpenChange={setOpen}>
        {newDetail ? (
          <div>
            ADD DETAIL TO DATABASE WITH THIS COORDINATES
            <Button
              className={`${detailFromProject ? "bg-green-600" : ""}`}
              onClick={() => setNewDetail(false)}
            >
              Or Choose from project
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Detail Label</FormLabel>
                    <FormControl>
                      <Input placeholder="Label" {...field} />
                    </FormControl>
                    <FormDescription>
                      This Label represent this Detail
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {pinType === "section" ? (
                <FormField
                  control={form.control}
                  name="orientation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Orinetation</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Orientation" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="right">Right</SelectItem>

                          <SelectItem value="left">Left</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Select Orientation.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : null}
              <div>Add New Detail or Choose from Details on project?</div>
              <div className="flex gap-2">
                <Button onClick={() => setNewDetail(true)}>
                  Add New Detail to project
                </Button>
                <Button
                  className={`${detailFromProject ? "bg-green-600" : ""}`}
                  onClick={() => setDetailFromProject(true)}
                >
                  Choose from project
                </Button>
              </div>

              {detailFromProject ? (
                <div>List of details on project...</div>
              ) : null}

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        )}
      </DialogWrapper>{" "}
    </div>
  );
}

export default NewSectionForm;
