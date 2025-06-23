'use client'

import { useActionState, useEffect, useRef } from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { submitContactForm, type State } from './actions'
import { AlertCircle, CheckCircle, Mail, MapPin, Phone } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Sending...' : 'Send Message'}
    </Button>
  )
}

export default function ContactPage() {
  const initialState: State = {};
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <div className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter">GET IN TOUCH WITH US</h1>
          <p className="max-w-3xl mx-auto mt-4 text-lg text-background/80">
            We are here to help you with any questions or inquiries you may have. Please feel free to reach out to us using the contact form below, and we will get back to you as soon as possible.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-center">
          <div className="flex flex-col items-center">
             <MapPin className="h-8 w-8 text-primary mb-3" />
             <h3 className="font-bold text-lg">Our Location</h3>
             <p className="text-background/80">Al Alameen City, El Alamein, Marsa Matrouh Governorate 5060310</p>
          </div>
          <div className="flex flex-col items-center">
             <Phone className="h-8 w-8 text-primary mb-3" />
             <h3 className="font-bold text-lg">Phone Number</h3>
             <a href="tel:+2001062065198" className="text-background/80 hover:text-primary">(+20)01062065198</a>
          </div>
          <div className="flex flex-col items-center">
             <Mail className="h-8 w-8 text-primary mb-3" />
             <h3 className="font-bold text-lg">Email</h3>
             <a href="mailto:qaiu@aiu.edu.eg" className="text-background/80 hover:text-primary">qaiu@aiu.edu.eg</a>
          </div>
        </div>

        <Card className="max-w-2xl mx-auto mt-12 bg-card/10 border-border/20">
          <CardContent className="p-8">
            <form ref={formRef} action={formAction} className="space-y-6">
              <div>
                <Label htmlFor="name" className="sr-only">Your Name</Label>
                <Input id="name" name="name" type="text" placeholder="Your Name" required className="bg-background/90 text-foreground placeholder:text-muted-foreground" />
                 {state?.errors?.name && <p className="text-sm text-red-400 mt-2">{state.errors.name[0]}</p>}
              </div>
              <div>
                <Label htmlFor="email" className="sr-only">Your Email</Label>
                <Input id="email" name="email" type="email" placeholder="Your Email" required className="bg-background/90 text-foreground placeholder:text-muted-foreground" />
                 {state?.errors?.email && <p className="text-sm text-red-400 mt-2">{state.errors.email[0]}</p>}
              </div>
              <div>
                <Label htmlFor="phone" className="sr-only">Your Phone</Label>
                <Input id="phone" name="phone" type="tel" placeholder="Your Phone" className="bg-background/90 text-foreground placeholder:text-muted-foreground"/>
                 {state?.errors?.phone && <p className="text-sm text-red-400 mt-2">{state.errors.phone[0]}</p>}
              </div>
              <div>
                <Label htmlFor="message" className="sr-only">Your Message</Label>
                <Textarea id="message" name="message" placeholder="Your Message" required rows={5} className="bg-background/90 text-foreground placeholder:text-muted-foreground" />
                 {state?.errors?.message && <p className="text-sm text-red-400 mt-2">{state.errors.message[0]}</p>}
              </div>
              
              {state?.message && (
                <Alert variant={state.success ? 'default' : 'destructive'} className={state.success ? 'bg-primary/10 border-primary text-primary' : ''}>
                  {state.success ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                  <AlertTitle>{state.success ? 'Success!' : 'Error'}</AlertTitle>
                  <AlertDescription>
                    {state.message}
                  </AlertDescription>
                </Alert>
              )}

              <SubmitButton />
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
