"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { trpc } from "@/trpc/client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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
import { LogIn } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 5 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 5 characters.",
  }),
});

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const router = useRouter();

  const {
    mutate: GetLogin,
    isLoading,
    isError,
  } = trpc.loginUser.useMutation({
    onSuccess: () => {
      router.push("/analytics");
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    let username = values.username;
    let EncryptedPassword = values.password;
    GetLogin({ username: username, EncryptedPassword: EncryptedPassword });
  }

  return (
    <main>
      <div className="mt-32 p-5 flex flex-col items-center justify-center">
        <div className="opacity-80 flex flex-col  p-10 max-w-3xl">
          <h2 className=" my-2 text-2xl text-semobold">
            {" "}
            Welcome to <span className="text-[#47989c] font-bold">
              GMS
            </span>{" "}
            Private App
          </h2>
          <div className="flex flex-col gap-2">
            {" "}
            <span>
              Dear Users, Thank you for choosing{" "}
              <span className="text-[#47989c] font-bold">GMS</span>!
            </span>
            <span>
              Our app is designed exclusively for our valued users. To access
              its features and benefits, please log in with your credentials.
              Your privacy and security are our top priorities.
            </span>
            <div className="">
              Best regards,{" "}
              <span>
                The <span className="text-[#47989c] font-bold">GMS</span> Team.
              </span>
            </div>
          </div>
        </div>
        <div className="container max-w-xl p-5 border rounded-lg bg-zinc-50">
          {" "}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username" {...field} />
                    </FormControl>
                    <FormDescription>Username provided by GMS</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormDescription>
                      Please enter password provided by GMS.
                    </FormDescription>
                    <FormMessage />
                    {isError ? (
                      <FormMessage>Wrong Username or Password.</FormMessage>
                    ) : null}
                  </FormItem>
                )}
              />
              <div
                className="flex gap-5
              justify-end
              "
              >
                <Button type="submit" className="bg-[#47989c]">
                  Log In
                  <LogIn className="ml-4 h-4 w-4" />
                </Button>

                {/* <Link href="/plans">
                  <Button type="submit" className="bg-[#47989c]">
                    GO TO APP
                    <LogIn className="ml-4 h-4 w-4" />
                  </Button>
                </Link> */}
              </div>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
}
