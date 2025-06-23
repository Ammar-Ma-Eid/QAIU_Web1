import Logo from './logo';
import { Facebook, Youtube, Mail } from 'lucide-react';
import Link from 'next/link';

const TiktokIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.03-4.83-.65-6.48-2.31-1.64-1.66-2.4-4.03-2.18-6.36.21-2.73 1.91-4.96 4.35-5.93 1.99-.8 4.15-1.02 6.2-.36.58.18 1.13.43 1.66.72v-4.59c-.94-.29-1.85-.56-2.73-.82-1.17-.33-2.35-.5-3.52-.64C9.04 8.99 7.62 8.74 6.2 8.32c-1.42-.41-2.73-.97-3.9-1.82C1.19 5.58.55 4.22.39 2.69 1.65 2.56 2.91 2.47 4.17 2.45c.28 2.21 2.02 4.02 4.26 4.54.49.12 1 .19 1.5.23v-4.7c.02-.45.09-.9.19-1.34.11-.53.29-1.06.52-1.54.19-.4.44-.78.74-1.13.29-.35.63-.67 1.01-.93z"/>
    </svg>
);


const Footer = () => {
  return (
    <footer className="bg-secondary border-t">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center flex-col">
           <Link href="/" className="flex items-center gap-3 mb-4">
              <Logo />
            </Link>
          <p className="text-center text-sm text-muted-foreground max-w-md mx-auto">
            Exploring the frontiers of Quantum Computing. A student-led initiative at Alamein International University.
          </p>
          <div className="flex justify-center space-x-6 mt-6">
            <a href="#" className="text-muted-foreground hover:text-primary" aria-label="Facebook">
              <span className="sr-only">Facebook</span>
              <Facebook className="h-6 w-6" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary" aria-label="YouTube">
              <span className="sr-only">YouTube</span>
              <Youtube className="h-6 w-6" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary" aria-label="TikTok">
              <span className="sr-only">TikTok</span>
              <TiktokIcon className="h-6 w-6" />
            </a>
             <a href="mailto:info@qaiu.edu" className="text-muted-foreground hover:text-primary" aria-label="Email">
              <span className="sr-only">Email</span>
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 text-center text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} QAIU. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
