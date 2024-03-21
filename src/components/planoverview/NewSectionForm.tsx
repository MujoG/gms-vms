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
  handleRefatch: any;
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
  content: z.string().min(1, {
    message: "Content must be at least 1 character.",
  }),
  orientation: z.string().min(1, {
    message: "Label must be at least 1 character.",
  }),
  taskType: z.string().min(1, {
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
  handleRefatch,
}: Props) {
  const [detailFromProject, setDetailFromProject] = React.useState(false);

  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: "",
      content: "",
      orientation: "right",
      taskType: "info",
    },
  });

  const { mutate: createNewDetail, isError: isCreateNewDetailError } =
    trpc.createNewDetail.useMutation({
      onSuccess: (newDetailData) => {
        console.log("Success from mutate createNewDetail:", newDetailData);
        queryClient.invalidateQueries(["getPlaneDetails", planeId]);
        handleRefatch();
        setOpen(false);
      },
      onError: (error) => {
        console.error("Error from mutate createNewDetail:", error);
      },
    });

  const { mutate: createNewTask, isError } = trpc.createNewTask.useMutation({
    onSuccess: (newDetailData) => {
      console.log("Success from mutate createNewDetail:", newDetailData);
      queryClient.invalidateQueries(["getPlaneDetails", planeId]);
      handleRefatch();
      setOpen(false);
    },
    onError: (error) => {
      console.error("Error from mutate createNewDetail:", error);
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let detailType = pinType;

    if (detailType === "detail") {
      console.log("ovo je detalj");
      try {
        let x = tempPins.start.x;
        let y = tempPins.start.y;
        let detailContent = values.content;
        let label = values.label;
        let detailType = pinType;
        let taskType = values.taskType;
        let PlaneId = planeId;

        const newPin: any = {
          X: x,
          Y: y,
          DetailType: detailType,
          DetailLabel: label,
          PlaneId: PlaneId,
          DetailContent: detailContent,
          TaskType : taskType
        };

        await createNewTask({
          newPin,
        });

        setTempPin({});
        setTempPins({});
        setOpen(false);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      try {
        let x = tempPins.start.x;
        let y = tempPins.start.y;
        let x2 = tempPins.end.x2;
        let y2 = tempPins.end.y2;
        let detailContent = values.content;
        let label = values.label;
        let direction = values.orientation;
        let detailType = pinType;
        let detailOrientation = values.orientation;
        let PlaneId = planeId;

        const newPin: any = {
          X: x,
          Y: y,
          X2: x2,
          Y2: y2,
          DetailType: detailType,
          DetailLabel: label,
          DetailDirection: direction,
          DetailOrientation: detailOrientation,
          PlaneId: PlaneId,
          DetailContent: detailContent,
        };

        await createNewDetail({
          newPin,
        });

        setTempPin({});
        setTempPins({});
        setOpen(false);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  }

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
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Detail Content</FormLabel>
                    <FormControl>
                      <Input placeholder="Content" {...field} />
                    </FormControl>
                    <FormDescription>
                      This Label represent this Detail
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {pinType === "detail" ? (
                <FormField
                  control={form.control}
                  name="taskType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ticket Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Ticket Type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="info">Info</SelectItem>
                          <SelectItem value="task">Task</SelectItem>
                        </SelectContent>
                      </Select>
                      {/* <FormDescription>Select Orientation.</FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : null}
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
              {/* <div>Add New Detail or Choose from Details on project?</div> */}
              {/* <div className="flex gap-2">
                <Button onClick={() => setNewDetail(true)}>
                  Add New Detail to project
                </Button>
                <Button
                  className={`${detailFromProject ? "bg-green-600" : ""}`}
                  onClick={() => setDetailFromProject(true)}
                >
                  Choose from project
                </Button>
              </div> */}

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
