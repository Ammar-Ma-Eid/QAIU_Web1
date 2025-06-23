'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { addEvent, updateEvent } from "@/app/admin/actions"
import type { upcomingEvents } from "@/lib/data"

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format.",
  }),
  description: z.string().min(10, "Description must be at least 10 characters."),
  location: z.string().min(2, "Location must be at least 2 characters."),
  imageUrl: z.string().url("Image URL must be a valid URL."),
})

type EventFormValues = z.infer<typeof formSchema>
type Event = (typeof upcomingEvents)[number];

interface EventFormProps {
  event?: Event
}

export function EventForm({ event }: EventFormProps) {
  const { toast } = useToast()
  const form = useForm<EventFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: event?.title || "",
      date: event ? format(new Date(event.date), "yyyy-MM-dd'T'HH:mm") : "",
      description: event?.description || "",
      location: event?.location || "",
      imageUrl: event?.imageUrl || "https://placehold.co/1200x600",
    },
  })

  async function onSubmit(data: EventFormValues) {
    const submissionData = {
        ...data,
        date: new Date(data.date).toISOString()
    };
    
    try {
      if (event) {
        await updateEvent(event.id, submissionData) 
        toast({
          title: "Event Updated",
          description: `The event "${data.title}" has been updated (simulation).`,
        })
      } else {
        await addEvent(submissionData)
        toast({
          title: "Event Added",
          description: `The event "${data.title}" has been added (simulation).`,
        })
      }
    } catch (error) {
       toast({
        title: "An Error Occurred",
        description: "Something went wrong. Please check the console and try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Event title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="datetime-local" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="e.g. AIU Campus, Auditorium B" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="A detailed description of the event..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://placehold.co/1200x600" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Saving...' : 'Save Changes'}
        </Button>
      </form>
    </Form>
  )
}
