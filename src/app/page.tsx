import { Button } from '@/components/ui/button';
import InteractiveBackground from '@/components/interactive-background';
import { ArrowRight, Atom, BrainCircuit, Cpu } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="relative w-full overflow-hidden">
      <InteractiveBackground />
      <div className="relative container mx-auto px-4 py-20 md:py-32 text-center">
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

      <div className="relative container mx-auto pb-20 md:pb-32">
        <div className="relative h-96 w-full flex items-center justify-center">
            <Image src="https://placehold.co/600x400" alt="Quantum Computer" width={450} height={300} className="absolute rounded-lg shadow-2xl animate-float-1" data-ai-hint="quantum computer" />
            <Image src="https://placehold.co/600x400" alt="AI Neural Network" width={300} height={200} className="absolute rounded-lg shadow-2xl animate-float-2" data-ai-hint="neural network" />
            <Image src="https://placehold.co/600x400" alt="Abstract Code" width={200} height={150} className="absolute rounded-lg shadow-2xl animate-float-3" data-ai-hint="abstract code" />
        </div>
      </div>
    </div>
  );
}
