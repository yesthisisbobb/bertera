"use client";

import { useRef, useEffect, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string; // For additional styling on the wrapper itself
  initialClass?: string;
  animateInClass?: string;
  threshold?: number;
  triggerOnce?: boolean;
  delay?: string; // Tailwind class like 'delay-100', 'delay-200'
  transitionDuration?: string; // Tailwind class like 'duration-500', 'duration-700'
}

export function AnimatedSection({
  children,
  className,
  initialClass = 'opacity-0 translate-y-8', // Default: Start slightly lower and faded
  animateInClass = 'opacity-100 translate-y-0', // Default: End fully visible and at original position
  threshold = 0.1, // Trigger when 10% of the element is visible
  triggerOnce = true,
  delay = '', // e.g., 'delay-150'
  transitionDuration = 'duration-700' // e.g., 'duration-700'
}: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = sectionRef.current; 
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (triggerOnce && currentRef) { 
              observer.unobserve(currentRef);
            }
          }
          // Optional: reset animation if scrolling out and triggerOnce is false
          // else if (!triggerOnce) { 
          //   setIsVisible(false); 
          // }
        });
      },
      { threshold }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef); 
      }
    };
  }, [threshold, triggerOnce]);

  return (
    <div
      ref={sectionRef}
      className={cn(
        'transition-all ease-out', 
        transitionDuration, 
        delay, 
        isVisible ? animateInClass : initialClass, 
        className 
      )}
    >
      {children}
    </div>
  );
}
