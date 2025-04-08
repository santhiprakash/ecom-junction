import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
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

const collectionSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  is_public: z.boolean().default(true),
  products: z.array(z.string()).min(1, { message: "Select at least one product" }),
});

type CollectionFormValues = z.infer<typeof collectionSchema>;

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
      is_public: collection?.is_public ?? true,
      products: collection?.products || [],
    },
  });

  const handleSubmit = async (values: CollectionFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      await onSubmit(values);
    } catch (err: any) {
      setError(err.message || "Failed to save collection");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Collection Name</FormLabel>
                <FormControl>
                  <Input placeholder="My Awesome Collection" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="A brief description of your collection..."
                    {...field}
                    rows={4}
                  />
                </FormControl>
                <FormDescription>
                  This will be displayed on your collection page.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="is_public"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Public Collection</FormLabel>
                  <FormDescription>
                    Make this collection visible to everyone. Private collections are only visible to you.
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
            <FormLabel>Select Products</FormLabel>
            <div className="border rounded-md p-4">
              {products.length === 0 ? (
                <p className="text-sm text-gray-500">
                  You don't have any products yet. Add some products first.
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {products.map((product) => (
                    <FormField
                      key={product.id}
                      control={form.control}
                      name="products"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(product.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  field.onChange([...field.value, product.id]);
                                } else {
                                  field.onChange(
                                    field.value?.filter((value) => value !== product.id)
                                  );
                                }
                              }}
                            />
                          </FormControl>
                          <div className="flex items-center space-x-3">
                            <img
                              src={product.image_url || "/placeholder-product.jpg"}
                              alt={product.title}
                              className="h-10 w-10 rounded-md object-cover"
                            />
                            <div className="space-y-1">
                              <p className="text-sm font-medium leading-none">
                                {product.title}
                              </p>
                              <p className="text-sm text-gray-500">
                                {new Intl.NumberFormat("en-IN", {
                                  style: "currency",
                                  currency: product.currency,
                                  maximumFractionDigits: 0,
                                }).format(product.price)}
                              </p>
                            </div>
                          </div>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              )}
            </div>
            <FormMessage>
              {form.formState.errors.products?.message}
            </FormMessage>
          </div>

          <Button type="submit" disabled={isLoading || products.length === 0}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              collection ? "Update Collection" : "Create Collection"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};
