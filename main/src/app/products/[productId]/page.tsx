
import {type Metadata} from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductDetails, ProductDetails as ProductOriginDisplay, type ProductDetails } from '../../../data/content'; // Updated import
import { Card, CardContent, CardDescription, CardHeader } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { ChevronLeft, Tag, Layers, Coffee } from 'lucide-react';

type ProductPageProps = {
  params: {
    productId: string;
  };
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = getProductDetails(params.productId);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} (${product.coffeeTypeName}) - Bertera Niaga Global`,
    description: `Details about ${product.name}, a ${product.coffeeTypeName} coffee. ${product.description.substring(0, 150)}...`,
    openGraph: {
        title: `${product.name} (${product.coffeeTypeName})`,
        description: product.description,
        images: [
            {
                url: product.imageUrl, // Ensure this is an absolute URL if hosted externally
                width: 400, // Consider using actual image dimensions or standard OG dimensions
                height: 300,
                alt: `Image of ${product.name}`,
            },
        ],
    },
  };
}

// Helper for price formatting, can be moved to utils if used elsewhere
function formatPrice(price: number, priceUnit: string, locale: string | undefined = undefined) {
    const parts = priceUnit.split(' ');
    const currencyCode = parts[0];
    const unit = parts.slice(1).join(' ');
    try {
      return `${new Intl.NumberFormat(locale, { style: 'currency', currency: currencyCode, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(price)}${unit ? ` ${unit}` : ''}`;
    } catch (e) {
      return `${currencyCode} ${price.toFixed(2)}${unit ? ` ${unit}` : ''}`;
    }
}

function ProductJsonLd({ product }: { product: ProductDetails }) {
  const currencyCode = product.priceUnit.split(' ')[0];
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${product.name} (${product.coffeeTypeName})`,
    "description": product.description,
    "image": [product.imageUrl],
    "sku": product.id,
    "brand": {
      "@type": "Brand",
      "name": "Bertera Niaga Global"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": currencyCode,
      "price": product.price.toFixed(2),
      "availability": "https://schema.org/InStock", // Assuming products are in stock
      "url": typeof window !== 'undefined' ? window.location.href : `https://yourwebsite.com/products/${product.id}` // Replace with your actual domain
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}


export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductDetails(params.productId);

  if (!product) {
    notFound();
  }

  return (
    <>
      <ProductJsonLd product={product} />
      <div className="bg-background py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8">
            <Link href="/#products" className="inline-flex items-center text-primary hover:underline">
              <ChevronLeft size={20} className="mr-1" />
              Back to All Products
            </Link>
          </div>

          <Card className="shadow-xl overflow-hidden bg-card">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative w-full h-80 md:h-[500px]">
                <Image
                  src={product.imageUrl}
                  alt={`Image of ${product.name} coffee`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                  data-ai-hint={product.imageHint}
                  priority
                />
                 {product.isBestSeller && (
                  <Badge variant="default" className="absolute top-4 right-4 z-10 bg-accent text-accent-foreground shadow-md">
                    Best Seller
                  </Badge>
                )}
              </div>
              <div className="flex flex-col justify-between">
                <CardHeader className="p-6 md:p-8">
                  {product.isBestSeller && (
                    <Badge variant="default" className="mb-2 w-fit bg-accent text-accent-foreground shadow-md">
                      Best Seller
                    </Badge>
                  )}
                  <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">{product.name}</h1>
                  <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-sm bg-secondary text-secondary-foreground px-3 py-1 rounded-full flex items-center">
                          <Coffee size={16} className="mr-1.5" />
                          {product.coffeeTypeName}
                      </span>
                      <span className="text-sm bg-muted text-muted-foreground px-3 py-1 rounded-full flex items-center">
                           <Tag size={16} className="mr-1.5" />
                          Origin: {product.name.split('(')[0].trim()}
                      </span>
                  </div>
                  <CardDescription className="text-base text-foreground/80 leading-relaxed mb-4">
                    {product.description}
                  </CardDescription>
                   <p className="text-2xl font-bold text-accent mb-6">
                      {formatPrice(product.price, product.priceUnit)}
                  </p>
                </CardHeader>
                <CardContent className="p-6 md:p-8 pt-0 md:pt-0">
                  <h4 className="text-lg font-semibold text-primary mb-2 flex items-center"><Layers size={20} className="mr-2"/>Coffee Type Details</h4>
                  <p className="text-sm text-foreground/70 mb-6">{product.coffeeTypeDescription}</p>
                  
                  <Link href="/#contact-us" passHref>
                    <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      Inquire About This Product
                    </Button>
                  </Link>
                </CardContent>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

    