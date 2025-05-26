
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/#home', label: 'Home', sectionId: 'home' },
  { href: '/#products', label: 'Products', sectionId: 'products' },
  { href: '/#why-us', label: 'Why Us', sectionId: 'why-us' },
  { href: '/#our-story', label: 'Our Story', sectionId: 'our-story' },
  { href: '/#testimonials', label: 'Testimonials', sectionId: 'testimonials' },
  { href: '/#blog', label: 'Blog', sectionId: 'blog' },
  { href: '/#contact-us', label: 'Contact Us', sectionId: 'contact-us' },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const navLinkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  useEffect(() => {
    navLinkRefs.current = navLinkRefs.current.slice(0, navLinks.length);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (pathname === '/') {
        let currentSectionId = 'home';
        for (let i = navLinks.length - 1; i >= 0; i--) {
          const link = navLinks[i];
          if (link.sectionId) {
            const sectionElement = document.getElementById(link.sectionId);
            if (sectionElement) {
              const rect = sectionElement.getBoundingClientRect();
              if (rect.top <= 100 && rect.bottom >= 100) {
                currentSectionId = link.sectionId;
                break;
              }
            }
          }
        }
        // If no section is actively in view by the threshold, but we are at the top, 'home' is active.
        if (window.scrollY < 50 && currentSectionId !== 'home') {
             // Check if home section is visible or near top
            const homeElement = document.getElementById('home');
            if(homeElement && homeElement.getBoundingClientRect().top <=100){
                 currentSectionId = 'home';
            } else if (currentSectionId === '' && navLinks.some(l => l.sectionId === 'home')) {
                 // If nothing else is active and we are near top, default to home
                 // This case handles when scrolled almost to top but not exactly matching 'home' criteria
            }
        }
        setActiveSection(currentSectionId || 'home');
      } else {
        let matchedSectionId = '';
        for (const link of navLinks) {
          const baseHref = link.href.split('#')[0];
          if (baseHref !== '/' && pathname.startsWith(baseHref)) {
            matchedSectionId = link.sectionId || link.label.toLowerCase().replace(/\s+/g, '-');
            break;
          }
        }
         if (!matchedSectionId && pathname.startsWith('/blog/')) {
            const blogLink = navLinks.find(l => l.href === '/#blog');
            if (blogLink) matchedSectionId = blogLink.sectionId;
        }
        if (!matchedSectionId && pathname.startsWith('/products/')) {
            const productsLink = navLinks.find(l => l.href === '/#products');
            if (productsLink) matchedSectionId = productsLink.sectionId;
        }
        setActiveSection(matchedSectionId);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial calculation after mount
    const timer = setTimeout(() => {
      handleScroll();
    }, 100); // Delay to ensure refs are populated

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [pathname]);


  useEffect(() => {
    if (navRef.current) {
      let activeLinkIndex = -1;

      if (pathname === '/') {
        activeLinkIndex = navLinks.findIndex(link => link.sectionId === activeSection);
      } else {
         activeLinkIndex = navLinks.findIndex(link => {
            const baseHref = link.href.split('#')[0];
            if (activeSection && link.sectionId === activeSection) return true;
            // Fallback for pages like /blog/slug matching /#blog
            if (baseHref !== '/' && pathname.startsWith(baseHref)) return true;
            if (pathname.startsWith('/blog/') && link.sectionId === 'blog') return true;
            if (pathname.startsWith('/products/') && link.sectionId === 'products') return true;
            return false;
        });
      }
      
      // Ensure 'home' is selected if nothing else matches on the homepage
      if (pathname === '/' && activeLinkIndex === -1 && activeSection === 'home') {
        activeLinkIndex = navLinks.findIndex(link => link.sectionId === 'home');
      }


      const activeLinkElement = navLinkRefs.current[activeLinkIndex];

      if (activeLinkElement) {
        setIndicatorStyle({
          left: activeLinkElement.offsetLeft,
          width: activeLinkElement.offsetWidth,
          opacity: 1,
        });
      } else {
        // If no specific link is active (e.g. on a sub-page not directly in nav), try to find a base match
        let foundBaseMatch = false;
        for(let i=0; i < navLinks.length; i++) {
            const link = navLinks[i];
            const baseHref = link.href.split('#')[0];
            if (baseHref !== '/' && pathname.startsWith(baseHref)) {
                const el = navLinkRefs.current[i];
                if (el) {
                    setIndicatorStyle({
                        left: el.offsetLeft,
                        width: el.offsetWidth,
                        opacity: 1,
                    });
                    foundBaseMatch = true;
                    break;
                }
            }
        }
        if (!foundBaseMatch) {
            setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
        }
      }
    }
  }, [activeSection, pathname]); 

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const targetPath = href.split('#')[0];
    const sectionId = href.split('#')[1];

    if (pathname === targetPath || (targetPath === '/' && (pathname.startsWith('/blog') || pathname.startsWith('/products')))) {
      e.preventDefault();
      if (sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(sectionId); // Manually set active section on click for immediate feedback
        } else if (href === '/#home' && targetPath === '/') {
           window.scrollTo({ top: 0, behavior: 'smooth' });
           setActiveSection('home');
        }
      } else if (href === '/#home') {
         window.scrollTo({ top: 0, behavior: 'smooth' });
         setActiveSection('home');
      }
    }
    setIsMobileMenuOpen(false);
  };
  
  const getLinkHref = (linkHref: string) => {
    if (pathname.startsWith('/blog/') && linkHref.startsWith('/#')) {
      return `/${linkHref}`;
    }
    if (pathname.startsWith('/products/') && linkHref.startsWith('/#')) {
      return `/${linkHref}`;
    }
    return linkHref;
  };

  const isLinkActive = (link: typeof navLinks[0]): boolean => {
    if (pathname === '/') {
      return activeSection === link.sectionId;
    }
    // For non-homepages
    const baseHref = link.href.split('#')[0];
    if (activeSection && link.sectionId === activeSection) return true; // If scroll determined activeSection
    if (baseHref !== '/' && pathname.startsWith(baseHref)) return true; // General case for matching base path

    // Specific fallbacks for blog and product parent sections
    if (pathname.startsWith('/blog/') && link.sectionId === 'blog') return true;
    if (pathname.startsWith('/products/') && link.sectionId === 'products') return true;
    
    return false;
  };


  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/50 dark:bg-black/50 backdrop-blur-xl shadow-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/#home" className="flex items-center gap-2" onClick={(e) => handleLinkClick(e, '/#home')}>
          <Image
            src="/images/logo/bertera-logo.png"
            alt="Bertera Niaga Logo"
            width={1200} 
            height={200} 
            className="h-9 w-auto" 
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav ref={navRef} className="hidden md:flex gap-6 relative">
          {navLinks.map((link, index) => (
            <Link
              key={link.href}
              href={getLinkHref(link.href)}
              onClick={(e) => handleLinkClick(e, link.href)}
              ref={(el: HTMLAnchorElement | null) => (navLinkRefs.current[index] = el)}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                isLinkActive(link) ? 'text-primary' : 'text-foreground/70'
              )}
            >
              {link.label}
            </Link>
          ))}
          <div
            className="absolute bottom-0 h-0.5 bg-primary transition-all duration-300 ease-in-out"
            style={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
              opacity: indicatorStyle.opacity,
            }}
          />
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] bg-white/50 dark:bg-black/50 backdrop-blur-xl">
              <nav className="flex flex-col gap-6 p-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={getLinkHref(link.href)}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={cn(
                        'text-lg font-medium transition-colors hover:text-primary',
                        isLinkActive(link) ? 'text-primary' : 'text-foreground/80'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
