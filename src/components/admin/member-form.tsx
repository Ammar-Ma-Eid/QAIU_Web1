'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

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
import { useToast } from "@/hooks/use-toast"
import { addMember, updateMember } from "@/app/admin/actions"
import type { members } from "@/lib/data"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  role: z.string().min(2, "Role must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  linkedinUrl: z.string().optional(),
  imageUrl: z.string().url("Image URL must be a valid URL."),
})

type MemberFormValues = z.infer<typeof formSchema>
type Member = (typeof members)[number];

interface MemberFormProps {
  member?: Member
}

export function MemberForm({ member }: MemberFormProps) {
  const { toast } = useToast()
  const form = useForm<MemberFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: member?.name || "",
      role: member?.role || "",
      email: member?.email || "",
      linkedinUrl: member?.linkedinUrl || "",
      imageUrl: member?.imageUrl || "https://placehold.co/300x300",
    },
  })

  async function onSubmit(data: MemberFormValues) {
    try {
      if (member) {
        await updateMember(member.id, data) 
        toast({
          title: "Member Updated",
          description: `Details for ${data.name} have been updated (simulation).`,
        })
      } else {
        await addMember(data)
        toast({
          title: "Member Added",
          description: `${data.name} has been added to the team (simulation).`,
        })
      }
       // In a real app, you might want to programmatically close the dialog here.
       // For this prototype, the user can close it manually after seeing the toast.
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Alice" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Input placeholder="e.g. President" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="e.g. alice@qaiu.edu" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="linkedinUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn URL (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://linkedin.com/in/..." {...field} />
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
                <Input placeholder="https://placehold.co/300x300" {...field} />
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
