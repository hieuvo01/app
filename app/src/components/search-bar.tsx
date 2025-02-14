"use client"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation";

const formSchema = z.object({
  input: z.string().min(2).max(50),
})

export default function SearchBar()
{
    const route = useRouter();
  //define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    route.push(`/search/${values?.input}`);

    form.reset();
  }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="input"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="search for movie name, actors, ..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    )
  }
  