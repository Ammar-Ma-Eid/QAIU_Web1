// This file has been migrated to /client/src/components/admin/event-form.tsx

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
type Event = {
  _id?: string;
  title: string;
  date: string;
  description: string;
  location?: string;
  imageUrl?: string;
  dataAiHint?: string;
  gallery?: Array<{ src: string; alt: string; dataAiHint: string }>;
};

interface EventFormProps {
  event?: Event;
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
      if (event && event._id) {
        await updateEvent(event._id, submissionData)
        toast({
          title: "Event Updated",
          description: `The event "${data.title}" has been updated (simulation).`,
        })
      } else if (!event) {
        await addEvent(submissionData)
        toast({
          title: "Event Added",
          description: `The event "${data.title}" has been added (simulation).`,
        })
      } else {
        toast({
          title: "Missing Event ID",
          description: "Cannot update event: missing event ID.",
          variant: "destructive",
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

        {/* Gallery Management */}
        <div>
          <label className="block font-medium mb-2">Gallery Images</label>
          <GalleryManager initialGallery={event?.gallery || []} />
        </div>
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Saving...' : 'Save Changes'}
        </Button>
      </form>
    </Form>
  )
}

import React, { useState } from 'react';

function GalleryManager({ initialGallery }: { initialGallery: Array<{ src: string; alt: string; dataAiHint?: string }> }) {
  const [gallery, setGallery] = useState(initialGallery);
  const [newImage, setNewImage] = useState({ src: '', alt: '', dataAiHint: '' });

  const addImage = () => {
    if (newImage.src && newImage.alt) {
      setGallery([...gallery, newImage]);
      setNewImage({ src: '', alt: '', dataAiHint: '' });
    }
  };

  const removeImage = (idx: number) => {
    setGallery(gallery.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          placeholder="Image URL"
          value={newImage.src}
          onChange={e => setNewImage({ ...newImage, src: e.target.value })}
        />
        <Input
          placeholder="Alt text"
          value={newImage.alt}
          onChange={e => setNewImage({ ...newImage, alt: e.target.value })}
        />
        <Input
          placeholder="AI Hint (optional)"
          value={newImage.dataAiHint}
          onChange={e => setNewImage({ ...newImage, dataAiHint: e.target.value })}
        />
        <Button type="button" onClick={addImage} variant="secondary">Add</Button>
      </div>
      <div className="flex flex-wrap gap-4 mt-2">
        {gallery.map((img, idx) => (
          <div key={idx} className="relative w-24 h-24 border rounded overflow-hidden">
            <img src={img.src} alt={img.alt} className="object-cover w-full h-full" />
            <button type="button" onClick={() => removeImage(idx)} className="absolute top-1 right-1 bg-destructive text-white rounded-full px-2 py-0.5 text-xs">✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}
