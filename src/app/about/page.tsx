import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { members } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import InteractiveBackground from '@/components/interactive-background';

export default function AboutPage() {
  const supervisor = members.find(m => m.role === 'Supervisor');
  const president = members.find(m => m.role === 'President');
  const otherMembers = members.filter(m => m.role !== 'Supervisor' && m.role !== 'President');

  return (
    <div className="relative overflow-hidden">
      <InteractiveBackground />
      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter">About AIU</h1>
          <p className="max-w-3xl mx-auto mt-4 text-lg text-muted-foreground">
            We are a passionate group of students at Alamein International University dedicated to exploring the vast potential of Quantum Artificial Intelligence.
          </p>
        </div>

        <section className="mb-20">
          <h2 className="font-headline text-3xl font-bold text-center mb-10">Our Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {supervisor && (
              <Card className="bg-card/60 backdrop-blur-sm border-border/50 overflow-hidden text-center shadow-lg">
                <CardHeader>
                  <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-primary/20">
                    <Image src={supervisor.imageUrl} alt={supervisor.name} fill style={{objectFit: 'cover'}} data-ai-hint={supervisor.dataAiHint} />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="font-headline text-2xl">{supervisor.name}</CardTitle>
                  <Badge variant="secondary" className="mt-2 text-base">{supervisor.role}</Badge>
                </CardContent>
              </Card>
            )}
            {president && (
              <Card className="bg-card/60 backdrop-blur-sm border-border/50 overflow-hidden text-center shadow-lg">
                <CardHeader>
                  <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-primary/20">
                    <Image src={president.imageUrl} alt={president.name} fill style={{objectFit: 'cover'}} data-ai-hint={president.dataAiHint} />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="font-headline text-2xl">{president.name}</CardTitle>
                  <Badge variant="default" className="mt-2 text-base">{president.role}</Badge>
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        <section>
          <h2 className="font-headline text-3xl font-bold text-center mb-10">Our Team</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {otherMembers.map((member) => (
              <Card key={member.name} className="bg-card/60 backdrop-blur-sm border-border/50 overflow-hidden text-center pt-6 shadow-lg">
                <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-primary/20">
                  <Image src={member.imageUrl} alt={member.name} fill style={{objectFit: 'cover'}} data-ai-hint={member.dataAiHint} />
                </div>
                <CardContent className="pt-4 px-2 pb-4">
                  <h3 className="font-headline text-lg font-semibold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
