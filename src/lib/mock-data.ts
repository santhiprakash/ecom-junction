import { Collection, Product, Tag, Category, UserRole, User } from "@/types";

export const mockUser: User = {
  id: "user-1",
  email: "sarah.johnson@example.com",
  name: "Sarah Johnson",
  role: UserRole.INFLUENCER,
  created_at: new Date().toISOString(),
};

export const mockTags: Tag[] = [
  { id: "tag-1", name: "Electronics", user_id: "user-1", created_at: new Date().toISOString() },
  { id: "tag-2", name: "Audio", user_id: "user-1", created_at: new Date().toISOString() },
  { id: "tag-3", name: "Fitness", user_id: "user-1", created_at: new Date().toISOString() },
  { id: "tag-4", name: "Kitchen", user_id: "user-1", created_at: new Date().toISOString() },
  { id: "tag-5", name: "Appliances", user_id: "user-1", created_at: new Date().toISOString() },
  { id: "tag-6", name: "Yoga", user_id: "user-1", created_at: new Date().toISOString() },
  { id: "tag-7", name: "Smart Home", user_id: "user-1", created_at: new Date().toISOString() },
  { id: "tag-8", name: "Lighting", user_id: "user-1", created_at: new Date().toISOString() },
  { id: "tag-9", name: "Hydration", user_id: "user-1", created_at: new Date().toISOString() },
];

export const mockCategories: Category[] = [
  { id: "cat-1", name: "Electronics", user_id: "user-1", created_at: new Date().toISOString() },
  { id: "cat-2", name: "Fitness", user_id: "user-1", created_at: new Date().toISOString() },
  { id: "cat-3", name: "Kitchen", user_id: "user-1", created_at: new Date().toISOString() },
  { id: "cat-4", name: "Smart Home", user_id: "user-1", created_at: new Date().toISOString() },
];

export const mockProducts: Product[] = [
  {
    id: "product-1",
    title: "Wireless Bluetooth Earbuds",
    description: "High-quality sound with noise cancellation and long battery life",
    price: 5999,
    currency: "INR",
    image_url: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    affiliate_link: "https://www.amazon.in/product/123",
    source: "Amazon",
    rating: 4.5,
    tags: ["Electronics", "Audio"],
    categories: ["Electronics"],
    user_id: "user-1",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "product-2",
    title: "Smart Fitness Tracker",
    description: "Track your steps, heart rate, sleep, and more with this waterproof fitness band",
    price: 3499,
    currency: "INR",
    image_url: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    affiliate_link: "https://www.amazon.in/product/456",
    source: "Amazon",
    rating: 4.2,
    tags: ["Electronics", "Fitness"],
    categories: ["Electronics", "Fitness"],
    user_id: "user-1",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "product-3",
    title: "Portable Blender",
    description: "USB rechargeable blender for smoothies and shakes on-the-go",
    price: 1999,
    currency: "INR",
    image_url: "https://images.unsplash.com/photo-1622480916113-9000ac49b79d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    affiliate_link: "https://www.amazon.in/product/789",
    source: "Amazon",
    rating: 4.0,
    tags: ["Kitchen", "Appliances"],
    categories: ["Kitchen"],
    user_id: "user-1",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "product-4",
    title: "Yoga Mat",
    description: "Non-slip and eco-friendly yoga mat with carrying strap",
    price: 1499,
    currency: "INR",
    image_url: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    affiliate_link: "https://www.amazon.in/product/101",
    source: "Amazon",
    rating: 4.7,
    tags: ["Fitness", "Yoga"],
    categories: ["Fitness"],
    user_id: "user-1",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "product-5",
    title: "Smart LED Light Bulbs",
    description: "Color-changing smart bulbs compatible with Alexa and Google Home",
    price: 2999,
    currency: "INR",
    image_url: "https://images.unsplash.com/photo-1558435186-db8a4aca0d7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    affiliate_link: "https://www.amazon.in/product/202",
    source: "Amazon",
    rating: 4.3,
    tags: ["Smart Home", "Lighting"],
    categories: ["Smart Home", "Electronics"],
    user_id: "user-1",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "product-6",
    title: "Stainless Steel Water Bottle",
    description: "Vacuum insulated bottle keeps cold for 24 hours or hot for 12 hours",
    price: 1299,
    currency: "INR",
    image_url: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    affiliate_link: "https://www.amazon.in/product/303",
    source: "Amazon",
    rating: 4.6,
    tags: ["Hydration"],
    categories: ["Fitness"],
    user_id: "user-1",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "product-7",
    title: "Wireless Charging Pad",
    description: "Fast wireless charging for all Qi-enabled smartphones and devices",
    price: 1899,
    currency: "INR",
    image_url: "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    affiliate_link: "https://www.amazon.in/product/404",
    source: "Amazon",
    rating: 4.4,
    tags: ["Electronics", "Smart Home"],
    categories: ["Electronics", "Smart Home"],
    user_id: "user-1",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "product-8",
    title: "Smart Coffee Maker",
    description: "WiFi-enabled coffee maker you can control from your smartphone",
    price: 7999,
    currency: "INR",
    image_url: "https://images.unsplash.com/photo-1585037891765-71f9b76c486a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    affiliate_link: "https://www.amazon.in/product/505",
    source: "Amazon",
    rating: 4.1,
    tags: ["Kitchen", "Appliances", "Smart Home"],
    categories: ["Kitchen", "Smart Home"],
    user_id: "user-1",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const mockCollections: Collection[] = [
  {
    id: "collection-1",
    name: "Fitness Essentials",
    description: "My favorite fitness products for a healthy lifestyle",
    is_public: true,
    user_id: "user-1",
    products: ["product-2", "product-4", "product-6"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    slug: "fitness-essentials",
  },
  {
    id: "collection-2",
    name: "Tech Gadgets",
    description: "Must-have tech gadgets for everyday use",
    is_public: true,
    user_id: "user-1",
    products: ["product-1", "product-2", "product-5", "product-7"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    slug: "tech-gadgets",
  },
  {
    id: "collection-3",
    name: "Smart Home Setup",
    description: "Essential products to make your home smarter",
    is_public: true,
    user_id: "user-1",
    products: ["product-5", "product-7", "product-8"],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    slug: "smart-home-setup",
  },
];
