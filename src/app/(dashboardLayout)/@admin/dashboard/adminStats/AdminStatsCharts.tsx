"use client";

import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AdminStatsChartsProps {
  stats: any;
}

const COLORS = [
  "#3b82f6",
  "#10b981",
  "#ef4444",
  "#f59e0b",
  "#8b5cf6",
  "#06b6d4",
];

export function AdminStatsCharts({ stats }: AdminStatsChartsProps) {
  const getValue = (val: any) => {
    if (Array.isArray(val)) return val.length;
    return val || 0;
  };

  // Process data for Users Overview Pie Chart
  const userData = useMemo(
    () =>
      [
        { name: "Active Users", value: getValue(stats.totalActiveUser) },
        { name: "Disabled Users", value: getValue(stats.totalDisableUser) },
      ].filter((item) => item.value > 0),
    [stats],
  );

  // Process data for Orders Overview Bar Chart
  const orderData = useMemo(
    () => [
      {
        name: "Preparing",
        count: getValue(stats.totalPreparingOrder),
        fill: "#f59e0b",
      },
      {
        name: "Ready",
        count: getValue(stats.totalReadyOrder),
        fill: "#10b981",
      },
      {
        name: "Delivered",
        count: getValue(stats.totalDeliveredOrder),
        fill: "#8b5cf6",
      },
      {
        name: "Cancelled",
        count: getValue(stats.totalCancelledOrder),
        fill: "#ef4444",
      },
    ],
    [stats],
  );

  // Process data for System Metrics
  const systemData = useMemo(
    () => [
      { name: "Users", value: getValue(stats.totalUser) },
      { name: "Categories", value: getValue(stats.totalCategories) },
      { name: "Menus", value: getValue(stats.totalMenu) },
    ],
    [stats],
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
      {/* Orders Status Chart */}
      <Card className="shadow-sm border-muted/60">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground/80">
            Orders Status
          </CardTitle>
          <CardDescription>
            Current distribution of all platform orders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={orderData}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="hsl(var(--muted-foreground)/0.2)"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                />
                <Tooltip
                  cursor={{ fill: "hsl(var(--accent))", opacity: 0.4 }}
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    borderRadius: "8px",
                    borderColor: "hsl(var(--border))",
                    boxShadow:
                      "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                  }}
                  itemStyle={{ color: "hsl(var(--popover-foreground))" }}
                />
                <Bar
                  dataKey="count"
                  radius={[6, 6, 0, 0]}
                  barSize={40}
                  animationDuration={1500}
                >
                  {orderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Users Distribution Chart */}
      <Card className="shadow-sm border-muted/60">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground/80">
            User Accounts
          </CardTitle>
          <CardDescription>
            Ratio of active vs disabled accounts
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              {userData.length > 0 ? (
                <PieChart>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      borderRadius: "8px",
                      borderColor: "hsl(var(--border))",
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    iconType="circle"
                  />
                  <Pie
                    data={userData}
                    cx="50%"
                    cy="45%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    animationDuration={1500}
                  >
                    {userData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
                  No user data available
                </div>
              )}
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* System Metrics Chart */}
      <Card className="shadow-sm border-muted/60 lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-foreground/80">
            Platform Resources
          </CardTitle>
          <CardDescription>Total counts of key system entities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={systemData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="hsl(var(--muted-foreground)/0.2)"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                />
                <Tooltip
                  cursor={{
                    stroke: "hsl(var(--muted-foreground)/0.2)",
                    strokeWidth: 1,
                    strokeDasharray: "3 3",
                  }}
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    borderRadius: "8px",
                    borderColor: "hsl(var(--border))",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{
                    r: 6,
                    fill: "#3b82f6",
                    strokeWidth: 2,
                    stroke: "#fff",
                  }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
