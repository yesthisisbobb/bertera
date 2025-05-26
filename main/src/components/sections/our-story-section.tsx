
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { storyEvents, StoryEvent } from '../../data/content';
import { Milestone } from 'lucide-react';

export function OurStorySection() {
  return (
    <section id="our-story" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Journey</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tracing the path of Bertera Niaga Global from a simple idea to a trusted name in coffee export.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-1 bg-border -translate-x-1/2"></div>

          {storyEvents.map((event: StoryEvent, index: number) => (
            <div key={event.id} className={`mb-12 md:flex ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} items-center w-full`}>
              {/* Content Card */}
              <div className="md:w-5/12">
                <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
                  <div className="relative w-full h-64 md:h-72 rounded-t-lg overflow-hidden">
                    <Image
                      src={event.imageUrl}
                      alt={event.title}
                      layout="fill"
                      objectFit="cover"
                      data-ai-hint={event.imageHint}
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-2xl text-primary">{event.title}</CardTitle>
                    <p className="text-sm text-accent font-semibold">{event.year}</p>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{event.description}</CardDescription>
                  </CardContent>
                </Card>
              </div>

              {/* Spacer & Dot for Desktop */}
              <div className="hidden md:flex md:w-2/12 justify-center">
                <div className="relative">
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-full border-4 border-background shadow-md flex items-center justify-center">
                    <Milestone className="text-primary-foreground" size={16}/>
                  </div>
                </div>
              </div>
              
              {/* Mobile Dot - Hidden on MD and up, shown below card on mobile */}
              <div className="md:hidden flex justify-center my-4">
                 <div className="w-6 h-6 bg-primary rounded-full border-2 border-background shadow-md flex items-center justify-center">
                    <Milestone className="text-primary-foreground" size={12}/>
                  </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
