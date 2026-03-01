"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  DollarSign,
  ShoppingBag,
  Utensils,
  Clock,
  CheckCircle,
  XCircle,
  Star,
} from "lucide-react";

export default function ProviderStats({ data }: { data: any }) {
  if (!data) return null;

  const stats = [
  
    {
      name: "Total Orders",
      value: data?.totalOrders || 0,
      icon: ShoppingBag,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      name: "Total Meals",
      value: data?.totalMeals || 0,
      icon: Utensils,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      name: "Preparing Orders",
      value: data?.totalPreparingOrder || 0,
      icon: Clock,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    {
      name: "Ready Orders",
      value: data?.totalReadyOrder || 0,
      icon: CheckCircle,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      name: "Cancelled Orders",
      value: data?.totalCancelledOrder || 0,
      icon: XCircle,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
    },
    {
      name: "Total Reviews",
      value: data?.totalReview || 0,
      icon: Star,
      color: "text-amber-400",
      bgColor: "bg-amber-400/10",
    },
  ];

  return (
    <div className="flex flex-col p-6 md:p-10 w-full max-w-7xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          Dashboard Overview
        </h2>
        <p className="text-muted-foreground mt-2">
          Track your restaurant's performance, orders, and revenue.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.name}
              className="overflow-hidden border-none shadow-sm bg-card hover:shadow-md transition-all duration-200"
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div
                    className={cn(
                      "p-3 rounded-xl flex items-center justify-center",
                      item.bgColor,
                    )}
                  >
                    <Icon className={cn("w-6 h-6", item.color)} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {item.name}
                    </p>
                    <h3 className="text-2xl font-bold tracking-tight mt-1">
                      {item.value}
                    </h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
