
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-8">
      <div className="container mx-auto px-4 md:px-6 text-center">
        {/* Social media links removed from here */}
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Bertera Niaga Global. All rights reserved.
        </p>
        <p className="text-xs mt-1">
          Beyond Border, Beyond Expectations.
        </p>
      </div>
    </footer>
  );
}
