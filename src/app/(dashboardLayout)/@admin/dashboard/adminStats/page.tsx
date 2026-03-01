import { getAdminStatsAction } from "@/server action/admin.action";
import React from "react";
import {
  Users,
  UserCheck,
  UserX,
  MenuSquare,
  Tags,
  Clock,
  Ban,
  CheckCircle,
  Truck,
  TrendingUp,
  PieChart as PieChartIcon,
  BarChart3,
} from "lucide-react";
import { AdminStatsCharts } from "./AdminStatsCharts";

export default async function AdminStatsPage() {
  const { data: response, error } = await getAdminStatsAction();
  const stats = response?.data || {};

  const getValue = (val: any) => {
    if (Array.isArray(val)) return val.length;
    return val || 0;
  };

  const statsConfig = [
    {
      title: "Total Users",
      value: getValue(stats.totalUser),
      icon: Users,
      color: "text-blue-500 dark:text-blue-400",
      bgColor: "bg-blue-500/10",
      border: "border-blue-500/20",
    },
    {
      title: "Active Users",
      value: getValue(stats.totalActiveUser),
      icon: UserCheck,
      color: "text-emerald-500 dark:text-emerald-400",
      bgColor: "bg-emerald-500/10",
      border: "border-emerald-500/20",
    },
    {
      title: "Disabled Users",
      value: getValue(stats.totalDisableUser),
      icon: UserX,
      color: "text-red-500 dark:text-red-400",
      bgColor: "bg-red-500/10",
      border: "border-red-500/20",
    },
    {
      title: "Total Menus",
      value: getValue(stats.totalMenu),
      icon: MenuSquare,
      color: "text-indigo-500 dark:text-indigo-400",
      bgColor: "bg-indigo-500/10",
      border: "border-indigo-500/20",
    },
    {
      title: "Total Categories",
      value: getValue(stats.totalCategories),
      icon: Tags,
      color: "text-cyan-500 dark:text-cyan-400",
      bgColor: "bg-cyan-500/10",
      border: "border-cyan-500/20",
    },
    {
      title: "Preparing Orders",
      value: getValue(stats.totalPreparingOrder),
      icon: Clock,
      color: "text-amber-500 dark:text-amber-400",
      bgColor: "bg-amber-500/10",
      border: "border-amber-500/20",
    },
    {
      title: "Ready Orders",
      value: getValue(stats.totalReadyOrder),
      icon: CheckCircle,
      color: "text-green-500 dark:text-green-400",
      bgColor: "bg-green-500/10",
      border: "border-green-500/20",
    },
    {
      title: "Delivered Orders",
      value: getValue(stats.totalDeliveredOrder),
      icon: Truck,
      color: "text-purple-500 dark:text-purple-400",
      bgColor: "bg-purple-500/10",
      border: "border-purple-500/20",
    },
    {
      title: "Cancelled Orders",
      value: getValue(stats.totalCancelledOrder),
      icon: Ban,
      color: "text-red-500 dark:text-red-400",
      bgColor: "bg-red-500/10",
      border: "border-red-500/20",
    },
  ];

  return (
    <div className="p-6 md:p-8 w-full max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight bg-linear-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your platform today.
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

      {/* Charts Section */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="w-5 h-5 text-indigo-500" />
          <h2 className="text-xl font-semibold tracking-tight">
            Analytics & Trends
          </h2>
        </div>
        <AdminStatsCharts stats={stats} />
      </div>
    </div>
  );
}
