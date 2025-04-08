import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ProductListItemProps {
  product: Product;
}

export const ProductListItem = ({ product }: ProductListItemProps) => {
  // Format price in INR
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <div className="relative h-48 w-full sm:h-auto sm:w-48 bg-gray-100">
          <div className="absolute top-2 right-2 bg-white text-xs px-2 py-1 rounded-md">
            {product.source}
          </div>
          <Image
            src={product.image_url || "/placeholder-product.jpg"}
            alt={product.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col p-4">
          <div className="flex items-center mb-2">
            {product.rating && (
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 text-sm font-medium">{product.rating}</span>
              </div>
            )}
          </div>
          <h3 className="font-medium mb-1">{product.title}</h3>
          <p className="text-sm text-gray-500 mb-2 flex-grow">{product.description}</p>
          <div className="flex flex-wrap gap-1 mb-3">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between mt-auto">
            <div className="font-bold text-lg">{formatPrice(product.price)}</div>
            <Button asChild variant="default">
              <Link href={product.affiliate_link} target="_blank" rel="noopener noreferrer">
                View Product
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
