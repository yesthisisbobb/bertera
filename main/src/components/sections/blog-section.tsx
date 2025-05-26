
"use client";

import Image from 'next/image';
import Link from 'next/link'; // Keep Link for fallback or direct navigation if modal fails or for "View All"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAllBlogPostPreviews, getBlogPostBySlug, type BlogPostPreview, type BlogPostFull } from '@/data/content';
import { CalendarDays, UserCircle, ArrowRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { BlogDetailModal } from '../modal/blog-detail-modal';

export function BlogSection() {
  const posts = getAllBlogPostPreviews();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0); // 1-indexed for display logic
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const [selectedPost, setSelectedPost] = useState<BlogPostFull | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onDotButtonClick = useCallback((index: number) => {
    api?.scrollTo(index);
  }, [api]);

  useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    };

    const onInitOrReInit = () => {
      setScrollSnaps(api.scrollSnapList());
      setCurrent(api.selectedScrollSnap() + 1);
    };

    api.on("select", onSelect);
    api.on("reInit", onInitOrReInit);

    // Initial setup
    onInitOrReInit();

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onInitOrReInit);
    };
  }, [api]);

  const handleOpenBlogModal = (slug: string) => {
    const post = getBlogPostBySlug(slug);
    if (post) {
      setSelectedPost(post);
      setIsModalOpen(true);
    }
  };

  const handleCloseBlogModal = () => {
    setIsModalOpen(false);
    // Delay clearing selectedPost to allow for modal close animation
    setTimeout(() => {
      setSelectedPost(null);
    }, 300); 
  };

  if (!posts || posts.length === 0) {
    return null; 
  }

  return (
    <section id="blog" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">From Our Blog</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Insights, stories, and the latest news from the world of Bertera Niaga Global coffee.
          </p>
        </div>

        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: posts.length > 1,
          }}
          className="w-full max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {posts.map((post) => (
              <CarouselItem key={post.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <article className="h-full">
                    <Card 
                      className="h-full flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card cursor-pointer group"
                      onClick={() => handleOpenBlogModal(post.slug)}
                    >
                      <div className="relative w-full h-56 overflow-hidden">
                        <Image
                          src={post.imageUrl}
                          alt={`Blog post image for ${post.title}`}
                          layout="fill"
                          objectFit="cover"
                          data-ai-hint={post.imageHint}
                          className="transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle 
                            className="text-xl lg:text-2xl text-primary group-hover:underline line-clamp-2"
                            onClick={(e) => { e.stopPropagation(); handleOpenBlogModal(post.slug);}} // Allow clicking title too
                        >
                            {post.title}
                        </CardTitle>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                          <span className="flex items-center gap-1.5">
                            <CalendarDays size={14} />
                            {post.date}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <UserCircle size={14} />
                            {post.author}
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          variant="link" 
                          className="p-0 text-accent hover:text-accent/80"
                          onClick={(e) => { e.stopPropagation(); handleOpenBlogModal(post.slug);}}
                          aria-label={`Read more about ${post.title}`}
                        >
                          Read More <ArrowRight size={16} className="ml-1" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </article>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {posts.length > 1 && (
            <>
              <CarouselPrevious className="hidden sm:flex" /> 
              <CarouselNext className="hidden sm:flex" />
            </>
          )}
        </Carousel>
        
        {scrollSnaps.length > 1 && (
          <div className="flex justify-center items-center space-x-2 pt-6">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={cn(
                  "h-2.5 w-2.5 rounded-full transition-all duration-300 ease-in-out",
                  index === current - 1 // current is 1-indexed
                    ? "bg-primary scale-125 ring-2 ring-primary/70 ring-offset-2 ring-offset-background" 
                    : "bg-muted hover:bg-primary/60"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
        
        {posts.length > 3 && ( 
           <div className="text-center mt-8">
            {/* This link remains, pointing to a potential dedicated blog listing page */}
            <Link href="/blog" passHref legacyBehavior> 
                <Button size="lg" variant="outline" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    View All Posts
                </Button>
            </Link>
           </div>
        )}
      </div>
      {selectedPost && (
        <BlogDetailModal
          post={selectedPost}
          isOpen={isModalOpen}
          onClose={handleCloseBlogModal}
        />
      )}
    </section>
  );
}
