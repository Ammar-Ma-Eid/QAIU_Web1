// This file has been migrated to /client/src/components/admin/blog-post-form.tsx

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
import { addBlogPost, updateBlogPost } from "@/app/admin/actions"

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  author: z.string().min(2, "Author name must be at least 2 characters."),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format.",
  }),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters."),
})

type BlogPostFormValues = z.infer<typeof formSchema>
type BlogPost = {
  _id?: string;
  title: string;
  author: string;
  date: string;
  excerpt?: string;
  gallery?: Array<{ src: string; alt: string; dataAiHint?: string }>;
};

interface BlogPostFormProps {
  post?: BlogPost;
}

export function BlogPostForm({ post }: BlogPostFormProps) {
  const { toast } = useToast()
  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post?.title || "",
      author: post?.author || "",
      date: post ? format(new Date(post.date), "yyyy-MM-dd'T'HH:mm") : "",
      excerpt: post?.excerpt || "",
    },
  })

  async function onSubmit(data: BlogPostFormValues) {
    const submissionData = {
      ...data,
      date: new Date(data.date).toISOString(),
    }

    try {
      if (post && post._id) {
        await updateBlogPost(post._id, submissionData)
        toast({
          title: "Blog Post Updated",
          description: `The post "${data.title}" has been updated (simulation).`,
        })
      } else {
        await addBlogPost(submissionData)
        toast({
          title: "Blog Post Added",
          description: `The post "${data.title}" has been added (simulation).`,
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
                <Input placeholder="Post title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input placeholder="Author's name" {...field} />
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
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt</FormLabel>
              <FormControl>
                <Textarea placeholder="A short summary of the post..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Gallery Management for Blog Post */}
        <div>
          <label className="block font-medium mb-2">Gallery Images</label>
          <GalleryManager initialGallery={post?.gallery || []} />
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
