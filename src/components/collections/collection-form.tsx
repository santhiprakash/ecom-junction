import { useState } from "react";
import { z } from "zod";
import { useForm, SubmitHandler, Control, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Collection, Product } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import Image from "next/image";

const collectionSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  is_public: z.boolean().default(true),
  products: z.array(z.string()).min(1, { message: "Select at least one product" }),
});

export type CollectionFormValues = z.infer<typeof collectionSchema>;

interface CollectionFormProps {
  collection?: Collection;
  products: Product[];
  onSubmit: (values: CollectionFormValues) => Promise<void>;
}

export const CollectionForm = ({
  collection,
  products,
  onSubmit,
}: CollectionFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<CollectionFormValues>({
    resolver: zodResolver(collectionSchema),
    defaultValues: {
      name: collection?.name || "",
      description: collection?.description || "",
      is_public: Boolean(collection?.is_public) || true,
      products: collection?.products || [],
    },
  });

  const handleSubmit: SubmitHandler<CollectionFormValues> = async (values) => {
    try {
      setIsLoading(true);
      setError(null);
      await onSubmit(values);
    } catch (err) {
      setError("An error occurred while saving the collection");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to type the control properly
  const typedControl = (form.control as unknown) as Control<CollectionFormValues>;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <FormField
          control={typedControl}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Collection Name</FormLabel>
              <FormControl>
                <Input placeholder="My Favorite Products" {...field} />
              </FormControl>
              <FormDescription>
                A descriptive name for your collection
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={typedControl}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="A collection of my favorite tech products..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Describe what this collection is about
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={typedControl}
          name="is_public"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Public Collection</FormLabel>
                <FormDescription>
                  Make this collection visible to everyone
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        
        <div className="space-y-4">
          <FormField
            control={typedControl}
            name="products"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Products</FormLabel>
                  <FormDescription>
                    Select products to include in this collection
                  </FormDescription>
                </div>
                {products.map((product) => (
                  <FormField
                    key={product.id}
                    control={typedControl}
                    name="products"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={product.id}
                          className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 mb-2"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(product.id)}
                              onCheckedChange={(checked) => {
                                const updatedProducts = checked
                                  ? [...field.value, product.id]
                                  : field.value?.filter(
                                      (value: string) => value !== product.id
                                    );
                                field.onChange(updatedProducts);
                              }}
                            />
                          </FormControl>
                          <div className="flex items-center space-x-3">
                            <div className="relative h-10 w-10 rounded-md overflow-hidden">
                              <Image
                                src={product.image_url || "/placeholder-product.jpg"}
                                alt={product.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium leading-none">
                                {product.title}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {product.price} {product.currency}
                              </p>
                            </div>
                          </div>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {collection ? "Update Collection" : "Create Collection"}
        </Button>
      </form>
    </Form>
  );
};
