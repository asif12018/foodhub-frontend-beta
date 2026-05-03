import { cn } from "@/lib/utils";

import { Price, PriceValue } from "@/components/price";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import Link from "next/link";

export interface ProductPrice {
  regular: number;
  sale?: number;
  currency: string;
}

export interface Product {
  id?: string | number;
  name: string;
  image: {
    src: string;
    alt: string;
  };
  link: string;
  description: string;
  price: ProductPrice;
  badge?: {
    text: string;
    backgroundColor?: string;
  };
  cuisine: string;
  dietary_tags: string[];
  preparation_time: number;
  restaurant?: string;
}

interface ProductCard1Props {
  className?: string;
  product: Product;
}

const ProductCard1 = ({ className, product }: ProductCard1Props) => {
  const { regular, sale, currency } = product.price;
  // console.log(product)
  return (
    <div
      className={cn(
        "group relative block w-full max-w-md transition-all duration-300",
        className,
      )}
    >
      <Card className="flex h-full flex-col overflow-hidden p-0 border border-border/50 bg-card shadow-md transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
        <CardHeader className="relative block p-0 overflow-hidden">
          <AspectRatio ratio={4/3} className="overflow-hidden bg-muted">
            <img
              src={product.image.src}
              alt={product.image.alt}
              className="block h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
            />
          </AspectRatio>
          {product.badge && (
            <Badge
              style={{
                background: product.badge.backgroundColor || 'var(--primary)',
              }}
              className="absolute left-4 top-4 border-none px-3 py-1 text-xs font-semibold shadow-sm backdrop-blur-md"
            >
              {product.badge.text}
            </Badge>
          )}
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <Badge variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-md">
              {product.cuisine}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <CardTitle className="text-xl font-bold line-clamp-1 group-hover:text-primary transition-colors">
              {product.name}
            </CardTitle>
          </div>
          
          <CardDescription className="line-clamp-2 text-sm font-medium text-muted-foreground mb-4">
            {product.description}
          </CardDescription>

          <div className="mt-auto flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                {product.restaurant}
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {product.preparation_time} min
              </span>
            </div>

            <div className="flex flex-wrap gap-1 mt-1">
              {product.dietary_tags?.map((tag) => (
                <span key={tag} className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
              <div className="flex flex-col">
                {product.price.sale ? (
                  <>
                    <span className="text-sm text-muted-foreground line-through">{product.price.regular} tk</span>
                    <span className="text-xl font-bold text-primary">{product.price.sale} tk</span>
                  </>
                ) : (
                  <span className="text-xl font-bold text-primary">{product.price.regular} tk</span>
                )}
              </div>
              <Button asChild className="rounded-full shadow-sm hover:shadow-md transition-shadow">
                <Link href={`/allFood/${product.id}`}>Order Now</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { ProductCard1 };
