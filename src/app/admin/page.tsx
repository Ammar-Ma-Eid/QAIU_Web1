import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { members, upcomingEvents, pastEvents } from '@/lib/data';
import { format } from 'date-fns';
import { Users, Calendar, BarChart3, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { logout } from '@/app/login/actions';

export default function AdminDashboardPage() {
  const totalMembers = members.length;
  const totalUpcomingEvents = upcomingEvents.length;
  const totalPastEvents = pastEvents.length;

  return (
    <div className="min-h-screen bg-secondary">
      <div className="bg-background">
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-start">
            <div>
              <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">Admin Dashboard</h1>
              <p className="mt-2 text-lg text-muted-foreground">
                An overview of your website's content.
              </p>
            </div>
            <form action={logout}>
              <Button type="submit" variant="outline">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Members</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalMembers}</div>
              <p className="text-xs text-muted-foreground">Team members in the system</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUpcomingEvents}</div>
              <p className="text-xs text-muted-foreground">Events scheduled</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Past Events</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPastEvents}</div>
              <p className="text-xs text-muted-foreground">Events already held</p>
            </CardContent>
          </Card>
        </section>

        {/* Recent Activity Section */}
        <section>
          <h2 className="font-headline text-2xl font-bold mb-4">Upcoming Events</h2>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Location</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingEvents.length > 0 ? (
                  upcomingEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">{event.title}</TableCell>
                      <TableCell>{format(new Date(event.date), 'PPP')}</TableCell>
                      <TableCell>{event.location}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                      No upcoming events.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Card>
        </section>
      </div>
    </div>
  );
}
