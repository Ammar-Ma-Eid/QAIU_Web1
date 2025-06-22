import Logo from './logo';
import { Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-secondary border-t">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center flex-col">
           <Link href="/" className="flex items-center gap-3 mb-4">
              <Logo />
              <span className="font-bold font-headline text-xl">AIU</span>
            </Link>
          <p className="text-center text-sm text-muted-foreground max-w-md mx-auto">
            Exploring the frontiers of Quantum Artificial Intelligence. A student-led initiative at Alamein International University.
          </p>
          <div className="flex justify-center space-x-6 mt-6">
            <a href="#" className="text-muted-foreground hover:text-primary" aria-label="Twitter">
              <span className="sr-only">Twitter</span>
              <Twitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary" aria-label="GitHub">
              <span className="sr-only">GitHub</span>
              <Github className="h-6 w-6" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary" aria-label="LinkedIn">
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 text-center text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} AIU. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
