'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { upcomingEvents, pastEvents } from '@/lib/data';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';

export default function EventsPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-16">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter">Events</h1>
        <p className="max-w-3xl mx-auto mt-4 text-lg text-muted-foreground">
          Join our workshops, seminars, and hackathons. Stay updated with our latest activities.
        </p>
      </div>

      <Tabs defaultValue="upcoming" className="w-full max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <div className="grid gap-6 mt-8">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event, index) => (
                <Card key={index} className="bg-card/60 backdrop-blur-sm border-border/50 shadow-lg">
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl">{event.title}</CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground pt-2">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>{format(new Date(event.date), 'PPP')}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{event.description}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
                <div className="text-center py-16 text-muted-foreground bg-card/60 backdrop-blur-sm border-border/50 rounded-lg shadow-lg">
                    <p>No upcoming events scheduled. Please check back soon!</p>
                </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="past">
          <div className="grid gap-6 mt-8">
             {pastEvents.map((event, index) => (
              <Card key={index} className="bg-card/60 backdrop-blur-sm border-border/50 opacity-80 shadow-lg">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">{event.title}</CardTitle>
                   <div className="flex items-center text-sm text-muted-foreground pt-2">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>{format(new Date(event.date), 'PPP')}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{event.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
