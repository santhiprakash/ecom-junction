import Link from "next/link";
import Image from "next/image";
import { Collection, Product } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Share2 } from "lucide-react";

interface CollectionCardProps {
  collection: Collection;
  products: Product[];
  onShare?: (collectionId: string) => void;
}

export const CollectionCard = ({
  collection,
  products,
  onShare,
}: CollectionCardProps) => {
  const productCount = collection.products.length;
  const previewProducts = products.slice(0, 4);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-medium text-lg">{collection.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{productCount} products</p>
          </div>
          {!collection.is_public && (
            <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
              Private
            </span>
          )}
        </div>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {collection.description}
        </p>
        
        {previewProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-2">
            {previewProducts.map((product) => (
              <div key={product.id} className="relative aspect-square bg-gray-100 rounded-md overflow-hidden">
                <div className="relative w-full h-full">
                  <Image
                    src={product.image_url || "/placeholder-product.jpg"}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
            {productCount > 4 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-md">
                <span className="text-white font-medium">+{productCount - 4} more</span>
              </div>
            )}
          </div>
        ) : (
          <div className="h-40 flex items-center justify-center bg-gray-100 rounded-md">
            <p className="text-gray-500">No products in this collection</p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button asChild variant="default" className="flex-1">
          <Link href={`/collections/${collection.slug}`}>
            <Eye className="mr-2 h-4 w-4" />
            View
          </Link>
        </Button>
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => onShare && onShare(collection.id)}
        >
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </CardFooter>
    </Card>
  );
};
