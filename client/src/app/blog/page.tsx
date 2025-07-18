import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

const fetcher = (url: string) => fetch(url).then(res => res.json());

// This file has been migrated to /client/src/app/blog/page.tsx

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetcher('/api/blog').then(data => {
      setBlogPosts(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-16">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter">Our Blog</h1>
        <p className="max-w-3xl mx-auto mt-4 text-lg text-muted-foreground">
          Insights, tutorials, and stories from the world of Quantum Computing.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post: any, index: number) => (
          <Card key={index} className="flex flex-col bg-card/60 backdrop-blur-sm border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl leading-tight">{post.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">{post.excerpt}</p>
            </CardContent>
            <CardFooter className="flex-col items-start gap-4">
              <div className="flex flex-wrap items-center justify-between text-sm text-muted-foreground w-full gap-2">
                <div className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>{format(new Date(post.date), 'PPP')}</span>
                </div>
              </div>
              <Button asChild variant="link" className="p-0 h-auto text-primary hover:text-primary/80">
                <Link href="#">
                  Read More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
