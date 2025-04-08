"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { StatsCard } from "@/components/dashboard/stats-card";
import { AnalyticsChart } from "@/components/dashboard/analytics-chart";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { mockProducts, mockCollections } from "@/lib/mock-data";
import { Link2, ShoppingBag, Users, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  // Mock analytics data
  const clicksData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Affiliate Link Clicks",
        data: [65, 78, 90, 85, 110, 125],
        borderColor: "#2563eb",
        backgroundColor: "rgba(37, 99, 235, 0.1)",
      },
    ],
  };

  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Estimated Revenue (₹)",
        data: [12000, 15000, 18000, 16500, 21000, 24500],
        borderColor: "#16a34a",
        backgroundColor: "rgba(22, 163, 74, 0.1)",
      },
    ],
  };

  // Mock recent activity data
  const recentActivities = [
    {
      id: "act-1",
      type: "product_added" as const,
      title: "New Product Added",
      description: "You added 'Smart LED Light Bulbs' to your products",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
      user: {
        name: "You",
      },
    },
    {
      id: "act-2",
      type: "link_clicked" as const,
      title: "Affiliate Link Clicked",
      description: "Someone clicked on your 'Wireless Bluetooth Earbuds' link",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    },
    {
      id: "act-3",
      type: "collection_shared" as const,
      title: "Collection Shared",
      description: "You shared your 'Fitness Essentials' collection",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
      user: {
        name: "You",
      },
    },
    {
      id: "act-4",
      type: "product_viewed" as const,
      title: "Product Viewed",
      description: "Your 'Smart Fitness Tracker' was viewed 12 times",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    },
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Overview of your affiliate marketing performance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Products"
            value={mockProducts.length}
            icon={ShoppingBag}
            description="Products in your catalog"
          />
          <StatsCard
            title="Total Collections"
            value={mockCollections.length}
            icon={Link2}
            description="Curated product collections"
          />
          <StatsCard
            title="Total Clicks"
            value="583"
            icon={Users}
            description="Affiliate link clicks this month"
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Estimated Revenue"
            value="₹24,500"
            icon={TrendingUp}
            description="Earnings this month"
            trend={{ value: 8, isPositive: true }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <AnalyticsChart
            title="Link Clicks"
            description="Affiliate link clicks over time"
            data={clicksData}
            type="line"
          />
          <AnalyticsChart
            title="Revenue"
            description="Estimated revenue over time"
            data={revenueData}
            type="bar"
          />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <RecentActivity activities={recentActivities} />
        </div>
      </div>
    </MainLayout>
  );
}
