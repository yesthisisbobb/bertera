
"use client";

import Image from 'next/image';

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex h-screen w-screen flex-col items-center justify-center bg-background transition-opacity duration-300 ease-in-out">
      {/* Container for the shimmer effect. Needs relative positioning and overflow-hidden. */}
      <div className="relative overflow-hidden shimmer-container">
        <Image
          src="/images/logo/bertera-logo.png"
          alt="Bertera Niaga Global Logo - Loading"
          width={400} 
          height={90} 
          className="h-auto block" // Ensure image is block for proper layout within shimmer
          style={{ width: '200px' }} 
          priority
        />
      </div>
    </div>
  );
}
