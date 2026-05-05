import { getProviderStatsAction } from "@/server action/providerStats.action";
import {
  Utensils,
  ShoppingBag,
  DollarSign,
  Clock,
  CheckCircle,
  Ban,
  Star,
  TrendingUp
} from "lucide-react";

export default async function ProviderStatsPage() {
  const { data: response, error } = await getProviderStatsAction();
  const stats = response || {};

  const statsConfig = [
    {
      title: "Total Meals",
      value: stats.totalMeals || 0,
      icon: Utensils,
      color: "text-blue-500 dark:text-blue-400",
      bgColor: "bg-blue-500/10",
      border: "border-blue-500/20",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders || 0,
      icon: ShoppingBag,
      color: "text-emerald-500 dark:text-emerald-400",
      bgColor: "bg-emerald-500/10",
      border: "border-emerald-500/20",
    },
    {
      title: "Revenue",
      value: `$${stats.totalIncome || 0}`,
      icon: DollarSign,
      color: "text-amber-500 dark:text-amber-400",
      bgColor: "bg-amber-500/10",
      border: "border-amber-500/20",
    },
    {
      title: "Preparing Orders",
      value: stats.totalPreparingOrder || 0,
      icon: Clock,
      color: "text-indigo-500 dark:text-indigo-400",
      bgColor: "bg-indigo-500/10",
      border: "border-indigo-500/20",
    },
    {
      title: "Ready Orders",
      value: stats.totalReadyOrder || 0,
      icon: CheckCircle,
      color: "text-green-500 dark:text-green-400",
      bgColor: "bg-green-500/10",
      border: "border-green-500/20",
    },
    {
      title: "Cancelled Orders",
      value: stats.totalCancelledOrder || 0,
      icon: Ban,
      color: "text-red-500 dark:text-red-400",
      bgColor: "bg-red-500/10",
      border: "border-red-500/20",
    },
    {
      title: "Total Reviews",
      value: stats.totalReview || 0,
      icon: Star,
      color: "text-purple-500 dark:text-purple-400",
      bgColor: "bg-purple-500/10",
      border: "border-purple-500/20",
    },
  ];

  return (
    <div className="p-6 md:p-8 w-full max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight bg-linear-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
          Provider Dashboard
        </h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your restaurant's performance.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm font-medium">
          Failed to load stats: {error.message || "Unknown error"}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {statsConfig.map((stat, i) => (
          <div
            key={i}
            className={`group relative overflow-hidden rounded-2xl border bg-card text-card-foreground p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 duration-300 ${stat.border}`}
          >
            {/* Background Gradient Effect */}
            <div
              className={`absolute -right-6 -top-6 w-32 h-32 rounded-full ${stat.bgColor} blur-3xl opacity-50 transition-opacity duration-500 group-hover:opacity-100`}
            />

            <div className="relative flex items-start justify-between">
              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <div className="flex items-baseline gap-2">
                  <h2 className="text-3xl font-bold tracking-tight">
                    {stat.value}
                  </h2>
                </div>
              </div>

              <div
                className={`p-3 rounded-2xl ${stat.bgColor} ${stat.color} ring-1 ring-inset ${stat.border} shadow-inner`}
              >
                <stat.icon className="w-5 h-5 shrink-0" />
              </div>
            </div>

            <div className="mt-5 flex items-center text-xs text-muted-foreground font-medium">
              <TrendingUp className="w-3.5 h-3.5 mr-1.5 text-emerald-500" />
              <span className="text-emerald-500 mr-1.5">Live</span>
              <span>Updated just now</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

