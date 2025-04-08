import { useState } from "react";
import { Collection } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Copy, Facebook, Link, Linkedin, Twitter } from "lucide-react";

interface CollectionShareProps {
  collection: Collection;
  isOpen: boolean;
  onClose: () => void;
}

export const CollectionShare = ({
  collection,
  isOpen,
  onClose,
}: CollectionShareProps) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("link");

  const shareUrl = `${window.location.origin}/collections/${collection.slug}`;
  const embedCode = `<iframe src="${window.location.origin}/embed/${collection.slug}" width="100%" height="600" frameborder="0"></iframe>`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSocialShare = (platform: string) => {
    let shareLink = "";
    const text = `Check out my collection: ${collection.name}`;
    
    switch (platform) {
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case "linkedin":
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      default:
        return;
    }
    
    window.open(shareLink, "_blank", "width=600,height=400");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Collection</DialogTitle>
          <DialogDescription>
            Share your collection "{collection.name}" with others
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="link" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="link">Share Link</TabsTrigger>
            <TabsTrigger value="embed">Embed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="link" className="space-y-4 py-4">
            <div className="flex items-center space-x-2">
              <Input
                value={shareUrl}
                readOnly
                className="flex-1"
              />
              <Button
                size="icon"
                variant="outline"
                onClick={() => handleCopy(shareUrl)}
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            
            <div className="flex justify-center space-x-4 pt-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleSocialShare("twitter")}
              >
                <Twitter className="h-5 w-5 text-[#1DA1F2]" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleSocialShare("facebook")}
              >
                <Facebook className="h-5 w-5 text-[#4267B2]" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleSocialShare("linkedin")}
              >
                <Linkedin className="h-5 w-5 text-[#0077B5]" />
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="embed" className="space-y-4 py-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-500">
                Copy this code to embed the collection on your website
              </p>
              <div className="relative">
                <div className="rounded-md bg-gray-100 p-4">
                  <pre className="text-sm overflow-x-auto">{embedCode}</pre>
                </div>
                <Button
                  size="sm"
                  variant="secondary"
                  className="absolute top-2 right-2"
                  onClick={() => handleCopy(embedCode)}
                >
                  {copied ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="sm:justify-start">
          <Button variant="secondary" onClick={onClose}>
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
