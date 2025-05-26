
"use client";

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useEffect, useRef } from 'react';
import Map, { Marker } from 'react-map-gl';
import Image from 'next/image'; 
import Link from 'next/link'; // Added for social links
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { MapPin, Phone, Mail, Loader2, Linkedin, Instagram } from 'lucide-react'; // Added Linkedin, Instagram
import { submitContactForm, type ContactFormState } from '../../app/actions';
import { useToast } from "../../hooks/use-toast";

const initialState: ContactFormState = {
  message: null,
  errors: null,
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Send Message
    </Button>
  );
}

export function ContactUsSection() {
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const companyLatitude = -7.2603033;
  const companyLongitude = 112.6816925;

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: "Success!",
          description: state.message,
          variant: "default",
        });
        formRef.current?.reset();
      } else if (state.errors) {
         toast({
          title: "Error",
          description: state.message || "Please correct the errors below.",
          variant: "destructive",
        });
      }
    }
  }, [state, toast]);

  return (
    <section id="contact-us" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Get in Touch</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We'd love to hear from you. Whether you have a question about our products or partnerships, our team is ready to answer all your questions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <Card className="shadow-lg bg-card">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Contact Form</CardTitle>
            </CardHeader>
            <CardContent>
              <form ref={formRef} action={formAction} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-foreground/80">Full Name</Label>
                  <Input id="name" name="name" placeholder="Your Name" required className="bg-background/50"/>
                  {state.errors?.name && <p className="text-sm text-destructive mt-1">{state.errors.name[0]}</p>}
                </div>
                <div>
                  <Label htmlFor="email" className="text-foreground/80">Email Address</Label>
                  <Input id="email" name="email" type="email" placeholder="your@email.com" required className="bg-background/50"/>
                  {state.errors?.email && <p className="text-sm text-destructive mt-1">{state.errors.email[0]}</p>}
                </div>
                <div>
                  <Label htmlFor="subject" className="text-foreground/80">Subject</Label>
                  <Input id="subject" name="subject" placeholder="Inquiry about..." required className="bg-background/50"/>
                  {state.errors?.subject && <p className="text-sm text-destructive mt-1">{state.errors.subject[0]}</p>}
                </div>
                <div>
                  <Label htmlFor="message" className="text-foreground/80">Message</Label>
                  <Textarea id="message" name="message" placeholder="Your message here..." rows={5} required className="bg-background/50"/>
                  {state.errors?.message && <p className="text-sm text-destructive mt-1">{state.errors.message[0]}</p>}
                </div>
                <SubmitButton />
              </form>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card className="shadow-lg bg-card">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Our Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-accent mt-1 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-primary">Address</h4>
                    <p className="text-muted-foreground">Jl. Karangpoh Indah 5/12, Surabaya, Indonesia</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-accent mt-1 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-primary">Phone</h4>
                    <p className="text-muted-foreground">+62 851 5611 3241</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-accent mt-1 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-primary">Email</h4>
                    <p className="text-muted-foreground">admin@berteraniagaglobal.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Linkedin className="w-6 h-6 text-accent mt-1 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-primary">LinkedIn</h4>
                    <Link href="https://www.linkedin.com/company/106691396/admin/dashboard/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
                      Bertera Niaga Global
                    </Link>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Instagram className="w-6 h-6 text-accent mt-1 shrink-0" />
                  <div>
                    <h4 className="font-semibold text-primary">Instagram</h4>
                    <Link href="https://www.instagram.com/berteraniaga/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
                      @berteraniaga
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg overflow-hidden bg-card">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Our Location</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                 <div className="aspect-video relative h-[300px] md:h-[400px]">
                    <Map
                      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
                      initialViewState={{
                        longitude: companyLongitude,
                        latitude: companyLatitude,
                        zoom: 15
                      }}
                      style={{width: '100%', height: '100%'}}
                      mapStyle="mapbox://styles/mapbox/streets-v12"
                      anchor="center"
                    >
                      <Marker longitude={companyLongitude} latitude={companyLatitude} anchor="center" >
                        <div className="w-10 h-10 p-0.5 bg-background rounded-full shadow-md border-2 border-primary">
                          <Image
                            src="/images/logo/bertera-logo.png" 
                            alt="Bertera Niaga Global Location"
                            width={40} 
                            height={40} 
                            className="rounded-full object-contain"
                          />
                        </div>
                      </Marker>
                    </Map>
                  </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
