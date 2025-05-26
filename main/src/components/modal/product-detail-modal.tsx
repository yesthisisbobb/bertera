
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // Added import for Badge
import type { ProductDetails } from "@/data/content";
import { X, Tag, Layers, Coffee } from "lucide-react";

// Helper for price formatting, copied from original product page
function formatPrice(price: number, priceUnit: string, locale: string | undefined = undefined) {
    const parts = priceUnit.split(' ');
    const currencyCode = parts[0];
    const unit = parts.slice(1).join(' ');
    try {
      return `${new Intl.NumberFormat(locale, { style: 'currency', currency: currencyCode, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(price)}${unit ? ` ${unit}` : ''}`;
    } catch (e) {
      // Fallback for invalid currency codes or environments
      return `${currencyCode} ${price.toFixed(2)}${unit ? ` ${unit}` : ''}`;
    }
}

interface ProductDetailModalProps {
  product: ProductDetails | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
  if (!product) {
    return null;
  }

  const handleInquire = () => {
    onClose();
    // Smooth scroll to contact section
    const contactSection = document.getElementById('contact-us');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="sm:max-w-3xl md:max-w-4xl lg:max-w-5xl w-[95vw] p-0 bg-background/80 dark:bg-neutral-900/80 backdrop-blur-xl shadow-2xl rounded-2xl border-none overflow-hidden max-h-[90vh] flex flex-col">
        <DialogHeader className="p-4 sm:p-6 pb-0 relative flex-shrink-0 text-center">
           {product.isBestSeller && (
            <Badge variant="default" className="mx-auto mb-2 w-fit bg-accent text-accent-foreground shadow-md">
              Best Seller
            </Badge>
           )}
           <DialogTitle className="text-2xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2 line-clamp-2">{product.name}</DialogTitle>
        </DialogHeader>
        
        <div className="overflow-y-auto flex-grow">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative w-full h-64 sm:h-80 md:h-[500px] flex-shrink-0">
              <Image
                src={product.imageUrl}
                alt={`Image of ${product.name} coffee`}
                layout="fill"
                objectFit="cover"
                className="md:rounded-l-2xl"
                data-ai-hint={product.imageHint}
                priority
              />
            </div>
            <div className="flex flex-col justify-between p-4 sm:p-6">
              <div>
                <div className="flex flex-wrap gap-2 mb-3 sm:mb-4 justify-center md:justify-start">
                    <span className="text-xs sm:text-sm bg-secondary text-secondary-foreground px-2.5 py-1 rounded-full flex items-center">
                        <Coffee size={14} className="mr-1.5" />
                        {product.coffeeTypeName}
                    </span>
                    <span className="text-xs sm:text-sm bg-muted text-muted-foreground px-2.5 py-1 rounded-full flex items-center">
                         <Tag size={14} className="mr-1.5" />
                        Origin: {product.name.split('(')[0].trim()}
                    </span>
                </div>
                <p className="text-lg sm:text-xl font-bold text-accent mb-3 sm:mb-4 text-center md:text-left">
                    {formatPrice(product.price, product.priceUnit)}
                </p>
                <h4 className="text-md sm:text-lg font-semibold text-primary mb-1 sm:mb-2 flex items-center"><Layers size={18} className="mr-2"/>Coffee Type Details</h4>
                <p className="text-xs sm:text-sm text-foreground/70 mb-3 sm:mb-4 leading-relaxed">{product.coffeeTypeDescription}</p>
                
                <h4 className="text-md sm:text-lg font-semibold text-primary mb-1 sm:mb-2">Description</h4>
                <p className="text-sm sm:text-base text-foreground/80 leading-relaxed mb-4 sm:mb-6">
                  {product.description}
                </p>
              </div>
              
              <Button 
                size="lg" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-auto text-sm sm:text-base"
                onClick={handleInquire}
              >
                Inquire About This Product
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
