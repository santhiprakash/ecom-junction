import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

const importSchema = z.object({
  url: z.string().url({ message: "Please enter a valid URL" }),
});

type ImportFormValues = z.infer<typeof importSchema>;

interface ProductImportFormProps {
  onImportSuccess: () => void;
}

export const ProductImportForm = ({ onImportSuccess }: ProductImportFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewData, setPreviewData] = useState<any | null>(null);

  const form = useForm<ImportFormValues>({
    resolver: zodResolver(importSchema),
    defaultValues: {
      url: "",
    },
  });

  const onSubmit = async (values: ImportFormValues) => {
    setIsLoading(true);
    setError(null);
    setPreviewData(null);

    try {
      // This would be replaced with actual API call to extract product data
      // For now, we'll simulate a successful extraction
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Simulate extracted product data
      const extractedData = {
        title: "Sample Product Title",
        description: "This is a sample product description that would be extracted from the affiliate link.",
        price: 1999,
        currency: "INR",
        image_url: "https://via.placeholder.com/300",
        affiliate_link: values.url,
        source: values.url.includes("amazon") ? "Amazon" : 
                values.url.includes("flipkart") ? "Flipkart" : "Other",
        rating: 4.5,
      };
      
      setPreviewData(extractedData);
    } catch (err: any) {
      setError(err.message || "Failed to extract product data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmImport = async () => {
    setIsLoading(true);
    
    try {
      // This would be replaced with actual API call to save the product
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      onImportSuccess();
      form.reset();
      setPreviewData(null);
    } catch (err: any) {
      setError(err.message || "Failed to import product");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Import Product</h2>
        <p className="text-gray-500">
          Paste an affiliate link to automatically import product details
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Affiliate Link</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://www.amazon.in/product/..."
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading || !!previewData}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Extracting...
              </>
            ) : (
              "Extract Product Data"
            )}
          </Button>
        </form>
      </Form>

      {previewData && (
        <div className="border rounded-lg p-4 space-y-4">
          <h3 className="text-lg font-medium">Product Preview</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <img
                src={previewData.image_url}
                alt={previewData.title}
                className="w-full h-auto rounded-md"
              />
            </div>
            
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Title</h4>
                <p>{previewData.title}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">Description</h4>
                <p className="text-sm">{previewData.description}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">Price</h4>
                <p>
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: previewData.currency,
                  }).format(previewData.price)}
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500">Source</h4>
                <p>{previewData.source}</p>
              </div>
              
              {previewData.rating && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Rating</h4>
                  <p>{previewData.rating}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setPreviewData(null)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button onClick={handleConfirmImport} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Importing...
                </>
              ) : (
                "Confirm Import"
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
