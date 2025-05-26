
import type { Metadata } from 'next';
import { ParallaxHomeSection } from '../components/sections/parallax-home-section';
import { ProductShowcaseSection } from '../components/sections/product-showcase-section';
import { OurStorySection } from '../components/sections/our-story-section';
import { WhyChooseUsSection } from '../components/sections/why-choose-us-section';
import { BlogSection } from '../components/sections/blog-section';
import { ClientTestimonialsSection } from '../components/sections/client-testimonials-section';
import { ContactUsSection } from '../components/sections/contact-us-section';
import { AnimatedSection } from '../components/common/AnimatedSection';

export const metadata: Metadata = {
  title: 'Bertera Niaga Global - Premium Indonesian Coffee Export & Blog',
  description: 'Discover premium Indonesian coffee beans from Bertera Niaga Global. We are a leading producer and wholesaler specializing in Arabica, Robusta, and Liberica coffee for export. Read our blog for coffee insights. Beyond Border, Beyond Expectations.',
  openGraph: {
    title: 'Bertera Niaga Global - Premium Indonesian Coffee Export & Blog',
    description: 'Your trusted partner for high-quality Indonesian coffee. Explore our range of Arabica, Robusta, and Liberica beans, and read our latest blog posts.',
    images: [
      {
        url: '/images/logo/bertera-logo.png',
        width: 1200,
        height: 200,
        alt: 'Bertera Niaga Global Logo',
      },
    ],
  },
};

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <AnimatedSection
        initialClass="opacity-0"
        animateInClass="opacity-100"
        transitionDuration="duration-1000"
      >
        <ParallaxHomeSection />
      </AnimatedSection>

      <AnimatedSection delay="delay-100">
        <ProductShowcaseSection />
      </AnimatedSection>

      <AnimatedSection delay="delay-100">
        <WhyChooseUsSection />
      </AnimatedSection>

      <AnimatedSection delay="delay-100">
        <OurStorySection />
      </AnimatedSection>
      
      <AnimatedSection delay="delay-100">
        <ClientTestimonialsSection />
      </AnimatedSection>

      <AnimatedSection delay="delay-100">
        <BlogSection />
      </AnimatedSection>

      <AnimatedSection delay="delay-100">
        <ContactUsSection />
      </AnimatedSection>
    </div>
  );
}
