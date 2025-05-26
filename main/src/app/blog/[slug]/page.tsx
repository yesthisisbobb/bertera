
import { type Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, type BlogPostFull } from '@/data/content';
import { Button } from '@/components/ui/button';
import { CalendarDays, UserCircle, ChevronLeft } from 'lucide-react';

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} - Bertera Niaga Global Blog`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} - Bertera Niaga Global Blog`,
      description: post.excerpt,
      type: 'article',
      publishedTime: new Date(post.date).toISOString(),
      authors: [post.author], // Consider a more structured author object if available
      images: [
        {
          url: post.ogImage || post.imageUrl,
          width: post.ogImage ? 1200 : 600,
          height: post.ogImage ? 630 : 400,
          alt: `Image for ${post.title}`,
        },
      ],
    },
  };
}

function BlogJsonLd({ post }: { post: BlogPostFull }) {
  // Ensure this URL is your actual domain
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://yourwebsite.com';
  const publisherLogoUrl = `${siteUrl}/images/logo/bertera-logo.png`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "image": [
      post.imageUrl,
      post.ogImage || post.imageUrl // Fallback if ogImage is not defined
    ],
    "datePublished": new Date(post.date).toISOString(),
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Bertera Niaga Global",
      "logo": {
        "@type": "ImageObject",
        "url": publisherLogoUrl
      }
    },
    "description": post.excerpt,
    "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": typeof window !== 'undefined' ? window.location.href : `${siteUrl}/blog/${post.slug}`
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <BlogJsonLd post={post} />
      <div className="bg-background py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="mb-8">
            <Link href="/#blog" className="inline-flex items-center text-primary hover:underline">
              <ChevronLeft size={20} className="mr-1" />
              Back to Blog Section
            </Link>
          </div>

          <article className="bg-card shadow-xl rounded-lg overflow-hidden p-6 md:p-10">
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4 leading-tight">{post.title}</h1>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <CalendarDays size={16} />
                  Published on {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <UserCircle size={16} />
                  By {post.author}
                </span>
              </div>
            </header>

            <div className="relative w-full h-64 md:h-80 lg:h-96 mb-8 rounded-md overflow-hidden shadow-md">
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
                         prose-li:mb-2"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          <div className="mt-12 text-center">
             <Link href="/#blog" passHref>
              <Button variant="outline" size="lg">
                  <ChevronLeft size={20} className="mr-2" /> More From Our Blog
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

    