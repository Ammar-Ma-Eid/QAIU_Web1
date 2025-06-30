'use client';

// This file has been migrated to /client/src/app/admin/page.tsx

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Users, Calendar, BarChart3, LogOut, PlusCircle, Edit, Trash2, Newspaper, Link as LinkIcon } from 'lucide-react';
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
import { EventForm } from '@/components/admin/event-form';
import { BlogPostForm } from '@/components/admin/blog-post-form';
import { deleteMember, deleteEvent, deleteBlogPost } from './actions';
import Link from 'next/link';

const fetcher = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch: ' + url);
    return res.json();
};

export default function AdminDashboardPage() {
    const [members, setMembers] = useState<any[]>([]);
    const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
    const [pastEvents, setPastEvents] = useState<any[]>([]);
    const [blogPosts, setBlogPosts] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setError(null);
        Promise.all([
            fetcher('/api/members'),
            fetcher('/api/events?type=upcoming'),
            fetcher('/api/events?type=past'),
            fetcher('/api/blog'),
        ])
            .then(([members, upcomingEvents, pastEvents, blogPosts]) => {
                setMembers(members);
                setUpcomingEvents(upcomingEvents);
                setPastEvents(pastEvents);
                setBlogPosts(blogPosts);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    const totalMembers = members.length;
    const totalUpcomingEvents = upcomingEvents.length;
    const totalPastEvents = pastEvents.length;
    const totalBlogPosts = blogPosts.length;

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }
    if (error) {
        return <div className="min-h-screen flex items-center justify-center text-red-500">Error: {error}</div>;
    }

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
                        <section className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Members</CardTitle>
                                    <Users className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{totalMembers}</div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{totalUpcomingEvents}</div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Past Events</CardTitle>
                                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{totalPastEvents}</div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
                                    <Newspaper className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{totalBlogPosts}</div>
                                </CardContent>
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
                                            <TableHead>Photo</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Role</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>LinkedIn</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {members.map((member: any) => (
                                            <TableRow key={member.id}>
                                                <TableCell>
                                                    {member.gallery && member.gallery.length > 0 ? (
                                                        <Dialog>
                                                            <DialogTrigger asChild>
                                                                <img src={member.gallery[0].src} alt={member.gallery[0].alt} className="w-10 h-10 rounded-full object-cover cursor-pointer" />
                                                            </DialogTrigger>
                                                            <DialogContent className="sm:max-w-lg">
                                                                <DialogHeader>
                                                                    <DialogTitle>{member.name}'s Gallery</DialogTitle>
                                                                </DialogHeader>
                                                                <div className="flex flex-wrap gap-4">
                                                                    {member.gallery.map((img: any, idx: number) => (
                                                                        <img key={idx} src={img.src} alt={img.alt} className="w-24 h-24 object-cover rounded" />
                                                                    ))}
                                                                </div>
                                                            </DialogContent>
                                                        </Dialog>
                                                    ) : (
                                                        <img src={member.imageUrl} alt={member.name} className="w-10 h-10 rounded-full object-cover" />
                                                    )}
                                                </TableCell>
                                                <TableCell className="font-medium">{member.name}</TableCell>
                                                <TableCell>{member.role}</TableCell>
                                                <TableCell>{member.email}</TableCell>
                                                <TableCell>
                                                    {member.linkedinUrl && member.linkedinUrl !== '#' ? (
                                                        <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1">
                                                            <LinkIcon className="h-3 w-3" />
                                                            Profile
                                                        </a>
                                                    ) : (
                                                        <span className="text-muted-foreground">N/A</span>
                                                    )}
                                                </TableCell>
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
                                                                <form action={() => deleteMember(member.id)}>
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

                    <TabsContent value="events" className="space-y-8">
                        <div className="flex justify-between items-center">
                            <h2 className="font-headline text-2xl font-bold">Manage Events</h2>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button size="sm">
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        Add Event
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-lg">
                                    <DialogHeader>
                                        <DialogTitle>Add New Event</DialogTitle>
                                        <DialogDescription>
                                            Fill in the details for the new event. Click save when you're done.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <EventForm />
                                </DialogContent>
                            </Dialog>
                        </div>
                        {[
                            { title: "Upcoming Events", events: upcomingEvents },
                            { title: "Past Events", events: pastEvents }
                        ].map((group) => (
                            <Card key={group.title}>
                                <CardHeader><CardTitle>{group.title}</CardTitle></CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Photo</TableHead>
                                                <TableHead>Title</TableHead>
                                                <TableHead>Date</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {group.events.map((event: any) => (
                                                <TableRow key={event.id}>
                                                    <TableCell>
                                                        {event.gallery && event.gallery.length > 0 ? (
                                                            <Dialog>
                                                                <DialogTrigger asChild>
                                                                    <img src={event.gallery[0].src} alt={event.gallery[0].alt} className="w-16 h-10 rounded object-cover cursor-pointer" />
                                                                </DialogTrigger>
                                                                <DialogContent className="sm:max-w-lg">
                                                                    <DialogHeader>
                                                                        <DialogTitle>{event.title} Gallery</DialogTitle>
                                                                    </DialogHeader>
                                                                    <div className="flex flex-wrap gap-4">
                                                                        {event.gallery.map((img: any, idx: number) => (
                                                                            <img key={idx} src={img.src} alt={img.alt} className="w-32 h-20 object-cover rounded" />
                                                                        ))}
                                                                    </div>
                                                                </DialogContent>
                                                            </Dialog>
                                                        ) : (
                                                            <img src={event.imageUrl} alt={event.title} className="w-16 h-10 rounded object-cover" />
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="font-medium">{event.title}</TableCell>
                                                    <TableCell>{format(new Date(event.date), 'PPP')}</TableCell>
                                                    <TableCell className="text-right space-x-2">
                                                        <Dialog>
                                                            <DialogTrigger asChild><Button variant="outline" size="icon"><Edit className="h-4 w-4" /></Button></DialogTrigger>
                                                            <DialogContent className="sm:max-w-lg">
                                                                <DialogHeader>
                                                                    <DialogTitle>Edit Event</DialogTitle>
                                                                    <DialogDescription>Update details for {event.title}.</DialogDescription>
                                                                </DialogHeader>
                                                                <EventForm event={event as any} />
                                                            </DialogContent>
                                                        </Dialog>
                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild><Button variant="outline" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></Button></AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                                    <AlertDialogDescription>This will permanently delete "{event.title}" (simulation).</AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                    <form action={() => deleteEvent(event.id)}><AlertDialogAction asChild><Button type="submit" variant="destructive">Delete</Button></AlertDialogAction></form>
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
                        ))}
                    </TabsContent>

                    <TabsContent value="blog">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>Blog Posts</CardTitle>
                                <Dialog>
                                    <DialogTrigger asChild><Button size="sm"><PlusCircle className="mr-2 h-4 w-4" />Add Post</Button></DialogTrigger>
                                    <DialogContent className="sm:max-w-lg">
                                        <DialogHeader>
                                            <DialogTitle>Add New Blog Post</DialogTitle>
                                            <DialogDescription>Write a new blog post. Click save when you're done.</DialogDescription>
                                        </DialogHeader>
                                        <BlogPostForm />
                                    </DialogContent>
                                </Dialog>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Photo</TableHead>
                                            <TableHead>Title</TableHead>
                                            <TableHead>Author</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {blogPosts.map((post: any) => (
                                            <TableRow key={post.id}>
                                                <TableCell>
                                                    {post.gallery && post.gallery.length > 0 ? (
                                                        <Dialog>
                                                            <DialogTrigger asChild>
                                                                <img src={post.gallery[0].src} alt={post.gallery[0].alt} className="w-16 h-10 rounded object-cover cursor-pointer" />
                                                            </DialogTrigger>
                                                            <DialogContent className="sm:max-w-lg">
                                                                <DialogHeader>
                                                                    <DialogTitle>{post.title} Gallery</DialogTitle>
                                                                </DialogHeader>
                                                                <div className="flex flex-wrap gap-4">
                                                                    {post.gallery.map((img: any, idx: number) => (
                                                                        <img key={idx} src={img.src} alt={img.alt} className="w-32 h-20 object-cover rounded" />
                                                                    ))}
                                                                </div>
                                                            </DialogContent>
                                                        </Dialog>
                                                    ) : (
                                                        <img src={post.imageUrl} alt={post.title} className="w-16 h-10 rounded object-cover" />
                                                    )}
                                                </TableCell>
                                                <TableCell className="font-medium">{post.title}</TableCell>
                                                <TableCell>{post.author}</TableCell>
                                                <TableCell>{format(new Date(post.date), 'PPP')}</TableCell>
                                                <TableCell className="text-right space-x-2">
                                                    <Dialog>
                                                        <DialogTrigger asChild><Button variant="outline" size="icon"><Edit className="h-4 w-4" /></Button></DialogTrigger>
                                                        <DialogContent className="sm:max-w-lg">
                                                            <DialogHeader>
                                                                <DialogTitle>Edit Blog Post</DialogTitle>
                                                                <DialogDescription>Update the post "{post.title}".</DialogDescription>
                                                            </DialogHeader>
                                                            <BlogPostForm post={post} />
                                                        </DialogContent>
                                                    </Dialog>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild><Button variant="outline" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></Button></AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                                <AlertDialogDescription>This will permanently delete "{post.title}" (simulation).</AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <form action={() => deleteBlogPost(post.id)}><AlertDialogAction asChild><Button type="submit" variant="destructive">Delete</Button></AlertDialogAction></form>
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
                </Tabs>
            </div>
        </div>
    );
}
