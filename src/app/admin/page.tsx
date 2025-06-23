import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { members, upcomingEvents, pastEvents } from '@/lib/data';
import { format } from 'date-fns';
import { Users, Calendar, BarChart3, LogOut, PlusCircle, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { logout } from '@/app/login/actions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { MemberForm } from '@/components/admin/member-form';
import { deleteMember } from './actions';

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
                Manage your website's content.
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
        <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="members">Members</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="blog">Blog</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
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
            </TabsContent>

            <TabsContent value="members">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Team Members</CardTitle>
                         <Dialog>
                            <DialogTrigger asChild>
                                <Button size="sm">
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Add Member
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Add New Member</DialogTitle>
                                    <DialogDescription>
                                        Fill in the details for the new team member. Click save when you're done.
                                    </DialogDescription>
                                </DialogHeader>
                                <MemberForm />
                            </DialogContent>
                        </Dialog>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {members.map((member) => (
                                    <TableRow key={member.id}>
                                        <TableCell className="font-medium">{member.name}</TableCell>
                                        <TableCell>{member.role}</TableCell>
                                        <TableCell>{member.email}</TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                     <Button variant="outline" size="icon">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[425px]">
                                                    <DialogHeader>
                                                        <DialogTitle>Edit Member</DialogTitle>
                                                         <DialogDescription>
                                                            Update the details for {member.name}. Click save when you're done.
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <MemberForm member={member} />
                                                </DialogContent>
                                            </Dialog>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="outline" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action cannot be undone. This will permanently delete {member.name} from the list (simulation).
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <form action={async () => { 'use server'; await deleteMember(member.id) }}>
                                                            <AlertDialogAction asChild>
                                                               <Button type="submit" variant="destructive">Delete</Button>
                                                            </AlertDialogAction>
                                                        </form>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="events">
                 <Card>
                    <CardHeader><CardTitle>Manage Events</CardTitle></CardHeader>
                    <CardContent><p className="text-muted-foreground">Event management is under construction.</p></CardContent>
                 </Card>
            </TabsContent>
            
            <TabsContent value="blog">
                <Card>
                    <CardHeader><CardTitle>Manage Blog Posts</CardTitle></CardHeader>
                    <CardContent><p className="text-muted-foreground">Blog management is under construction.</p></CardContent>
                 </Card>
            </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
