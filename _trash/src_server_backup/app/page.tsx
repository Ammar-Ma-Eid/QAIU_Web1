import { Button } from '@/components/ui/button';
import { ArrowRight, Atom, BrainCircuit, Cpu, CheckCircle, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { ContactForm } from '@/components/contact-form';
import ClientInteractiveBackground from '@/components/client-interactive-background';


export default function Home() {
  const quantumApplications = [
    { title: 'Cryptography', description: 'Breaking or creating ultra-secure encryption' },
    { title: 'Drug discovery', description: 'Simulating molecules to speed up medicine development' },
    { title: 'Optimization', description: 'Solving complex problems in logistics, finance, and engineering' },
    { title: 'Artificial Intelligence', description: 'Speeding up machine learning algorithms' },
    { title: 'Material science', description: 'Designing new materials at the atomic level' },
    { title: 'Weather forecasting', description: 'Improving climate and weather prediction accuracy' },
    { title: 'Financial modeling', description: 'Analyzing risk and markets more effectively' },
  ];

  return (
    <div className="relative w-full overflow-hidden">
      <ClientInteractiveBackground />
      <section className="relative">
        <div className="absolute inset-0 z-0 opacity-10">
          <Image
            src="https://placehold.co/1600x900"
            alt="Quantum computer background"
            fill
            className="object-cover"
            data-ai-hint="quantum computer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background" />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-20 md:py-32 text-center">
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-4">
            Quantum computing at <span className="text-primary">Alamein International University</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
            Exploring the world of quantum computing to pioneer the next wave of technological innovation.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/about">
                Learn More <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/events">
                Upcoming Events
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="relative container mx-auto px-4 pb-20 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-lg bg-card/50 backdrop-blur-sm border flex flex-col items-center text-center shadow-lg">
            <div className="p-3 mb-4 bg-primary/10 rounded-full">
              <Atom className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-headline text-xl font-semibold mb-2">Quantum Computing</h3>
            <p className="text-muted-foreground text-sm">Delve into the principles of quantum mechanics and their application in computation.</p>
          </div>
          <div className="p-8 rounded-lg bg-card/50 backdrop-blur-sm border flex flex-col items-center text-center shadow-lg">
            <div className="p-3 mb-4 bg-primary/10 rounded-full">
              <BrainCircuit className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-headline text-xl font-semibold mb-2">Artificial Intelligence</h3>
            <p className="text-muted-foreground text-sm">Harness the power of machine learning and neural networks to solve complex problems.</p>
          </div>
          <div className="p-8 rounded-lg bg-card/50 backdrop-blur-sm border flex flex-col items-center text-center shadow-lg">
            <div className="p-3 mb-4 bg-primary/10 rounded-full">
              <Cpu className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-headline text-xl font-semibold mb-2">The Intersection</h3>
            <p className="text-muted-foreground text-sm">Innovate at the cutting-edge intersection where quantum meets AI to unlock new possibilities.</p>
          </div>
        </div>
      </div>

      <section className="relative container mx-auto px-4 pb-20 md:pb-32">
        <div className="text-center mb-16">
          <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tighter">Events and Activities</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-lg bg-card border flex flex-col text-center shadow-lg">
            <h3 className="font-headline text-2xl font-bold mb-4">QBRRONZE</h3>
            <p className="text-muted-foreground flex-grow">An exciting event focused on quantum computing basics and applications.</p>
            <Button asChild variant="link" className="mt-6">
              <Link href="#">Know More</Link>
            </Button>
          </div>
          <div className="p-8 rounded-lg bg-card border flex flex-col text-center shadow-lg">
            <h3 className="font-headline text-2xl font-bold mb-4">Q CITY</h3>
            <p className="text-muted-foreground flex-grow">A collaborative event exploring the intersection of quantum computing and smart cities.</p>
            <Button asChild variant="link" className="mt-6">
              <Link href="#">Know More</Link>
            </Button>
          </div>
          <div className="p-8 rounded-lg bg-card border flex flex-col text-center shadow-lg">
            <h3 className="font-headline text-2xl font-bold mb-4">QCOBALT</h3>
            <p className="text-muted-foreground flex-grow">An advanced workshop diving deep into quantum algorithms and their applications.</p>
            <Button asChild variant="link" className="mt-6">
              <Link href="#">Know More</Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="relative container mx-auto pb-20 md:pb-32">
        <div className="relative h-96 w-full flex items-center justify-center">
          <Image src="https://placehold.co/600x400" alt="Quantum Computer" width={450} height={300} className="absolute rounded-lg shadow-2xl animate-float-1" data-ai-hint="quantum computer" />
          <Image src="https://placehold.co/600x400" alt="AI Neural Network" width={300} height={200} className="absolute rounded-lg shadow-2xl animate-float-2" data-ai-hint="neural network" />
          <Image src="https://placehold.co/600x400" alt="Abstract Code" width={200} height={150} className="absolute rounded-lg shadow-2xl animate-float-3" data-ai-hint="abstract code" />
        </div>
      </div>

      <section className="bg-foreground text-background">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <h2 className="font-headline text-3xl font-bold mb-6">What is Quantum Computing?</h2>
              <p className="text-lg text-background/80 leading-relaxed">
                Quantum computing uses the principles of quantum mechanics to process information. Unlike regular computers that use bits (0 or 1), quantum computers use qubits, which can be 0 and 1 at the same time (superposition). They also use entanglement, linking qubits together in powerful ways. This allows quantum computers to solve certain complex problems much faster than classical computers, although they are still mostly experimental today.
              </p>
            </div>
            <div>
              <h2 className="font-headline text-3xl font-bold mb-6">Quantum Applications</h2>
              <ul className="space-y-4">
                {quantumApplications.map((app) => (
                  <li key={app.title} className="flex items-start">
                    <CheckCircle className="h-6 w-6 mr-3 mt-1 text-primary flex-shrink-0" />
                    <div>
                      <strong className="text-background">{app.title}:</strong>
                      <span className="text-background/80 ml-2">{app.description}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-secondary">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tighter">GET IN TOUCH WITH US</h2>
            <p className="max-w-3xl mx-auto mt-4 text-lg text-muted-foreground">
              We are here to help you with any questions or inquiries you may have. Please feel free to reach out to us using the contact form below, and we will get back to you as soon as possible.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-center">
            <div className="flex flex-col items-center">
              <MapPin className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-bold text-lg">Our Location</h3>
              <p className="text-muted-foreground">Al Alameen City, El Alamein, Marsa Matrouh Governorate 5060310</p>
            </div>
            <div className="flex flex-col items-center">
              <Phone className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-bold text-lg">Phone Number</h3>
              <a href="tel:+2001062065198" className="text-muted-foreground hover:text-primary">(+20)01062065198</a>
            </div>
            <div className="flex flex-col items-center">
              <Mail className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-bold text-lg">Email</h3>
              <a href="mailto:qaiu@aiu.edu.eg" className="text-muted-foreground hover:text-primary">qaiu@aiu.edu.eg</a>
            </div>
          </div>

          <Card className="max-w-2xl mx-auto mt-12 bg-card">
            <CardContent className="p-8">
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

// This file has been migrated to /client/src/app/page.tsx
