"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { mockTags, mockCategories } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Link as LinkIcon, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

export default function NewProductPage() {
  const router = useRouter();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    currency: "INR",
    image_url: "",
    affiliate_link: "",
    source: "Amazon",
    selectedTags: [] as string[],
    selectedCategories: [] as string[],
  });
  
  const [affiliateLinkInput, setAffiliateLinkInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Set preview image when image URL changes
    if (name === "image_url" && value) {
      setPreviewImage(value);
    }
  };
  
  const handleTagToggle = (tagName: string) => {
    setFormData((prev) => {
      if (prev.selectedTags.includes(tagName)) {
        return {
          ...prev,
          selectedTags: prev.selectedTags.filter((t) => t !== tagName),
        };
      } else {
        return {
          ...prev,
          selectedTags: [...prev.selectedTags, tagName],
        };
      }
    });
  };
  
  const handleCategoryToggle = (categoryName: string) => {
    setFormData((prev) => {
      if (prev.selectedCategories.includes(categoryName)) {
        return {
          ...prev,
          selectedCategories: prev.selectedCategories.filter((c) => c !== categoryName),
        };
      } else {
        return {
          ...prev,
          selectedCategories: [...prev.selectedCategories, categoryName],
        };
      }
    });
  };
  
  const handleSourceChange = (value: string) => {
    setFormData((prev) => ({ ...prev, source: value }));
  };
  
  const handleCurrencyChange = (value: string) => {
    setFormData((prev) => ({ ...prev, currency: value }));
  };
  
  const handleAffiliateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAffiliateLinkInput(e.target.value);
  };
  
  const handleAddAffiliateLink = () => {
    if (affiliateLinkInput) {
      setFormData((prev) => ({ ...prev, affiliate_link: affiliateLinkInput }));
      setAffiliateLinkInput("");
      
      // In a real app, we would fetch product details from the affiliate link here
      toast({
        title: "Affiliate link added",
        description: "In a production environment, this would fetch product details automatically.",
      });
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validate form
      if (!formData.title || !formData.description || !formData.price || !formData.affiliate_link) {
        throw new Error("Please fill in all required fields");
      }
      
      if (formData.selectedCategories.length === 0) {
        throw new Error("Please select at least one category");
      }
      
      // In a real app, we would save the product to the database here
      // For now, just show a success message and redirect
      
      toast({
        title: "Product added successfully",
        description: "Your product has been added to your collection.",
      });
      
      // Redirect to products page
      setTimeout(() => {
        router.push("/products");
      }, 1500);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" className="mr-2" asChild>
            <Link href="/products">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Products
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Add New Product</CardTitle>
                <CardDescription>
                  Add a new affiliate product to your collection
                </CardDescription>
              </CardHeader>
              
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Product Title *</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g., Wireless Bluetooth Earbuds"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe the product..."
                      rows={4}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price *</Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="999"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <Select
                        value={formData.currency}
                        onValueChange={handleCurrencyChange}
                      >
                        <SelectTrigger id="currency">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                          <SelectItem value="USD">US Dollar ($)</SelectItem>
                          <SelectItem value="EUR">Euro (€)</SelectItem>
                          <SelectItem value="GBP">British Pound (£)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="image_url">Product Image URL</Label>
                    <Input
                      id="image_url"
                      name="image_url"
                      value={formData.image_url}
                      onChange={handleInputChange}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Affiliate Link *</Label>
                    <div className="flex gap-2">
                      <Input
                        value={affiliateLinkInput}
                        onChange={handleAffiliateInputChange}
                        placeholder="Paste affiliate link here..."
                        className="flex-grow"
                      />
                      <Button
                        type="button"
                        onClick={handleAddAffiliateLink}
                        variant="secondary"
                      >
                        <LinkIcon className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                    
                    {formData.affiliate_link && (
                      <div className="mt-2 p-2 bg-muted rounded-md flex items-center justify-between">
                        <span className="text-sm truncate max-w-[90%]">
                          {formData.affiliate_link}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setFormData((prev) => ({ ...prev, affiliate_link: "" }))}
                          className="h-6 w-6 p-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="source">Source</Label>
                    <Select
                      value={formData.source}
                      onValueChange={handleSourceChange}
                    >
                      <SelectTrigger id="source">
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Amazon">Amazon</SelectItem>
                        <SelectItem value="Flipkart">Flipkart</SelectItem>
                        <SelectItem value="Myntra">Myntra</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Categories *</Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {mockCategories.map((category) => (
                        <div key={category.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`category-${category.id}`}
                            checked={formData.selectedCategories.includes(category.name)}
                            onCheckedChange={() => handleCategoryToggle(category.name)}
                          />
                          <label
                            htmlFor={`category-${category.id}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {category.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Tags</Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {mockTags.map((tag) => (
                        <Badge
                          key={tag.id}
                          variant={formData.selectedTags.includes(tag.name) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => handleTagToggle(tag.name)}
                        >
                          {tag.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Adding..." : "Add Product"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>
                  How your product will appear
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="aspect-square bg-gray-100 rounded-md relative overflow-hidden">
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Product preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-muted-foreground">
                        No image provided
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="font-medium line-clamp-2">
                      {formData.title || "Product Title"}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                      {formData.description || "Product description will appear here"}
                    </p>
                    
                    <div className="mt-2">
                      <span className="font-bold text-lg">
                        {formData.price
                          ? new Intl.NumberFormat("en-IN", {
                              style: "currency",
                              currency: formData.currency,
                              maximumFractionDigits: 0,
                            }).format(Number(formData.price))
                          : "₹0"}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mt-2">
                      {formData.selectedTags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {formData.selectedTags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{formData.selectedTags.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
