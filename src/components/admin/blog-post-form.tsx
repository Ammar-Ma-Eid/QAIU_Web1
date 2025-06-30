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
import type { BlogPost } from "@/lib/types"

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  author: z.string().min(2, "Author name must be at least 2 characters."),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format.",
  }),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters."),
})

type BlogPostFormValues = z.infer<typeof formSchema>

interface BlogPostFormProps {
  post?: BlogPost
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
      if (post) {
        await updateBlogPost(post.id, submissionData) 
        toast({
          title: "Blog Post Updated",
          description: `The post "${data.title}" has been updated.`,
        })
      } else {
        await addBlogPost(submissionData)
        toast({
          title: "Blog Post Added",
          description: `The post "${data.title}" has been added.`,
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
        <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Saving...' : 'Save Changes'}
        </Button>
      </form>
    </Form>
  )
}
