
"use client";
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { coffeeData, CoffeeOrigin, getAllCoffeeOrigins, ProductDetails as ProductOriginDisplay, ProductDetails } from '../../data/content';
import { Package, Search as SearchIcon, PackageSearch, Bean, ArrowDownUp } from 'lucide-react';
import { ProductDetailModal } from '../modal/product-detail-modal';
import { cn } from '@/lib/utils';

const ALL_PRODUCTS_CATEGORY_ID = 'all-products';

interface CategoryDefinition {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  origins?: CoffeeOrigin[];
}

type SortOrder = "default" | "price-asc" | "price-desc" | "name-asc" | "name-desc";

export function ProductShowcaseSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [hydrated, setHydrated] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<SortOrder>("default");

  const categoryDefinitions: CategoryDefinition[] = [
    { id: ALL_PRODUCTS_CATEGORY_ID, name: 'All Products', description: 'Browse all our available coffee varieties.', icon: PackageSearch },
    ...coffeeData.map(type => ({ ...type, icon: Bean, id: type.id, name: type.name, description: type.description, origins: type.origins })),
  ];
  
  const [activeCategory, setActiveCategory] = useState(categoryDefinitions[0]?.id || ALL_PRODUCTS_CATEGORY_ID);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setSearchTerm(''); 
    setSortOrder("default");
  };

  const openProductModal = (product: ProductDetails) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeProductModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  const formatPrice = (price: number, priceUnit: string) => {
    if (!hydrated) return `Loading price...`;
    const parts = priceUnit.split(' ');
    const currencyCode = parts[0];
    const unit = parts.slice(1).join(' ');
    try {
      return `${new Intl.NumberFormat(undefined, { style: 'currency', currency: currencyCode, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(price)}${unit ? ` ${unit}` : ''}`;
    } catch (e) {
      return `${currencyCode} ${price.toFixed(2)}${unit ? ` ${unit}` : ''}`;
    }
  };
  
  const allProductsList = getAllCoffeeOrigins();

  const getFilteredAndSortedProducts = (): ProductOriginDisplay[] => {
    let sourceProducts: ProductOriginDisplay[];

    if (activeCategory === ALL_PRODUCTS_CATEGORY_ID) {
      sourceProducts = allProductsList;
    } else {
      const selectedCoffeeType = coffeeData.find(type => type.id === activeCategory);
      sourceProducts = selectedCoffeeType 
        ? selectedCoffeeType.origins.map(origin => ({
            ...origin,
            coffeeTypeName: selectedCoffeeType.name,
            coffeeTypeDescription: selectedCoffeeType.description,
          }))
        : [];
    }

    let filtered = sourceProducts;
    if (searchTerm !== '') {
      filtered = sourceProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.coffeeTypeName && product.coffeeTypeName.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    let sortedProducts = [...filtered]; 
    switch (sortOrder) {
      case "price-asc":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "default":
      default:
        break;
    }
    return sortedProducts;
  };
  
  const filteredAndSortedProducts = getFilteredAndSortedProducts();
  const currentCategoryInfo = categoryDefinitions.find(cat => cat.id === activeCategory);

  // Key for re-triggering animations on the product grid
  const productGridKey = `${activeCategory}-${searchTerm}-${sortOrder}`;

  return (
    <section id="products" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Finest Coffees</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the rich aromas and unique flavors of Indonesian coffee, sourced with care and passion.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-1/4 lg:w-1/5 space-y-4">
            <h3 className="text-xl font-semibold text-primary px-2">Categories</h3>
            <div className="flex flex-col space-y-1">
              {categoryDefinitions.map((cat) => (
                <Button
                  key={cat.id}
                  variant={activeCategory === cat.id ? "default" : "ghost"}
                  className="w-full justify-start text-left h-auto py-2 px-3 flex items-center gap-2"
                  onClick={() => handleCategoryChange(cat.id)}
                >
                  <cat.icon className="h-4 w-4 mr-2 shrink-0" />
                  {cat.name}
                </Button>
              ))}
            </div>
          </aside>

          <main className="md:w-3/4 lg:w-4/5 space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative flex-grow w-full sm:w-auto">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={`Search in ${currentCategoryInfo?.name || 'products'}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full bg-background/80 border-border focus:ring-primary"
                  aria-label={`Search coffee products in ${currentCategoryInfo?.name}`}
                />
              </div>
              <div className="w-full sm:w-auto sm:min-w-[200px]">
                <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as SortOrder)}>
                  <SelectTrigger className="w-full bg-background/80 border-border focus:ring-primary">
                    <ArrowDownUp className="h-4 w-4 mr-2 text-muted-foreground" />
                    <SelectValue placeholder="Sort by..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="name-asc">Name: A-Z</SelectItem>
                    <SelectItem value="name-desc">Name: Z-A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {currentCategoryInfo && (
              <div className="mb-8 p-6 bg-background rounded-lg shadow">
                <h3 className="text-2xl font-semibold text-primary mb-3 flex items-center gap-2">
                   <currentCategoryInfo.icon className="h-6 w-6" />
                   {currentCategoryInfo.name}
                </h3>
                <p className="text-muted-foreground">{currentCategoryInfo.description}</p>
              </div>
            )}
              
            {filteredAndSortedProducts.length > 0 ? (
              <div key={productGridKey} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedProducts.map((product: ProductOriginDisplay, index) => (
                  <Card 
                    key={product.id} 
                    onClick={() => openProductModal(product)}
                    className={cn(
                        "product-card-animate-in", // Animation class
                        "overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col bg-background h-full cursor-pointer relative"
                    )}
                    style={{ animationDelay: `${index * 30}ms` }} // Staggered animation
                  >
                    <div className="relative w-full h-56">
                      <Image
                        src={product.imageUrl}
                        alt={`Image of ${product.name}${product.coffeeTypeName ? ` (${product.coffeeTypeName})` : ''} coffee`}
                        layout="fill"
                        objectFit="cover"
                        data-ai-hint={product.imageHint}
                      />
                      {product.isBestSeller && (
                        <Badge variant="default" className="absolute top-3 right-3 z-10 bg-accent text-accent-foreground shadow-md">
                          Best Seller
                        </Badge>
                      )}
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl text-primary flex items-center gap-2">
                        <Package size={24} /> 
                        {product.name}
                         {activeCategory === ALL_PRODUCTS_CATEGORY_ID && product.coffeeTypeName && (
                          <span className="text-xs text-muted-foreground ml-1 whitespace-nowrap">({product.coffeeTypeName})</span>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col justify-between">
                      <CardDescription className="text-sm line-clamp-3">{product.description}</CardDescription>
                      {hydrated && (
                         <p className="text-lg font-semibold text-accent mt-4">
                          {formatPrice(product.price, product.priceUnit)}
                        </p>
                      )}
                      {!hydrated && (
                         <p className="text-lg font-semibold text-accent mt-4 animate-pulse">
                           Loading price...
                         </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-background rounded-lg shadow">
                <p className="text-lg text-muted-foreground">
                  No {currentCategoryInfo?.name.toLowerCase()} products found {searchTerm ? `matching "${searchTerm}"` : ''}.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={closeProductModal}
        />
      )}
    </section>
  );
}
