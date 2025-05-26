
"use client";

import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { BlogPostFull } from '@/data/content';
import { CalendarDays, UserCircle } from 'lucide-react';

interface BlogDetailModalProps {
  post: BlogPostFull | null;
  isOpen: boolean;
  onClose: () => void;
}

export function BlogDetailModal({ post, isOpen, onClose }: BlogDetailModalProps) {
  if (!post) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="sm:max-w-3xl md:max-w-4xl lg:max-w-5xl w-[95vw] p-0 bg-background/90 dark:bg-neutral-900/90 backdrop-blur-lg shadow-2xl rounded-2xl border-border max-h-[90vh] flex flex-col">
        <DialogHeader className="p-4 sm:p-6 pb-3 relative flex-shrink-0 border-b"> {/* Increased pb slightly */}
          <DialogTitle className="text-2xl sm:text-3xl font-bold text-primary mb-2 sm:mb-3 line-clamp-3 text-center">{post.title}</DialogTitle> {/* Adjusted margin bottom */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground"> {/* Ensured text-sm, adjusted gap-y */}
            <span className="flex items-center gap-1.5">
              <CalendarDays size={16} /> {/* Increased icon size */}
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <UserCircle size={16} /> {/* Increased icon size */}
              By {post.author}
            </span>
          </div>
          {/* The default DialogContent close button (an X icon) will be used. */}
        </DialogHeader>
        
        {/* This div will handle the scrolling for the article content */}
        <div className="flex-grow overflow-y-auto min-h-0">
          <article className="p-4 sm:p-6 md:p-8">
            <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 mb-6 sm:mb-8 rounded-lg overflow-hidden shadow-md">
              <Image
                src={post.imageUrl}
                alt={`Main image for ${post.title}`}
                layout="fill"
                objectFit="cover"
                data-ai-hint={post.imageHint}
                priority
              />
            </div>

            <div
              className="prose prose-lg dark:prose-invert max-w-none text-foreground/90 
                         prose-headings:text-primary prose-a:text-accent prose-strong:text-foreground
                         prose-ul:list-disc prose-ul:pl-6 prose-ol:list-decimal prose-ol:pl-6
                         prose-li:mb-2" // Changed from prose-li:my-1 and ensured prose-lg
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </div>
      </DialogContent>
    </Dialog>
  );
}
