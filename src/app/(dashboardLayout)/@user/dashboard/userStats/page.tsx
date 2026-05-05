import { getProfileDataAction } from "@/server action/profile.action";
import { getUserMyOrders } from "@/server action/order.action";
import { getMyCart } from "@/server action/cart.action";
import { Mail, MapPin, Phone, Calendar, ShoppingBag, ShoppingCart, Star, TrendingUp } from "lucide-react";

export default async function UserStatsPage() {
  const [profileResult, ordersResult, cartResult] = await Promise.all([
    getProfileDataAction(),
    getUserMyOrders(),
    getMyCart(),
  ]);

  const user = profileResult?.data || {};
  const profile = user.customerProfile || {};
  const orders: any[] = ordersResult?.data?.data || [];
  const cartItems: any[] = cartResult?.data?.data || [];

  const totalOrders = orders.length;
  const totalCartItems = cartItems.length;
  const pendingOrders = orders.filter((o: any) => o.status === "PREPARING").length;
  const deliveredOrders = orders.filter((o: any) => o.status === "DELIVERED" || o.status === "READY").length;

  const statsConfig = [
    {
      title: "Total Orders",
      value: totalOrders,
      icon: ShoppingBag,
      color: "text-blue-500 dark:text-blue-400",
      bgColor: "bg-blue-500/10",
      border: "border-blue-500/20",
    },
    {
      title: "Cart Items",
      value: totalCartItems,
      icon: ShoppingCart,
      color: "text-amber-500 dark:text-amber-400",
      bgColor: "bg-amber-500/10",
      border: "border-amber-500/20",
    },
    {
      title: "Pending Orders",
      value: pendingOrders,
      icon: Calendar,
      color: "text-indigo-500 dark:text-indigo-400",
      bgColor: "bg-indigo-500/10",
      border: "border-indigo-500/20",
    },
    {
      title: "Delivered",
      value: deliveredOrders,
      icon: Star,
      color: "text-emerald-500 dark:text-emerald-400",
      bgColor: "bg-emerald-500/10",
      border: "border-emerald-500/20",
    },
  ];

  return (
    <div className="p-6 md:p-8 w-full max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight bg-linear-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
          User Dashboard
        </h1>
        <p className="text-muted-foreground">
          Welcome back, {user.name || "User"}! Here's your activity summary.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsConfig.map((stat, i) => (
          <div
            key={i}
            className={`group relative overflow-hidden rounded-2xl border bg-card text-card-foreground p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 duration-300 ${stat.border}`}
          >
            <div className={`absolute -right-6 -top-6 w-32 h-32 rounded-full ${stat.bgColor} blur-3xl opacity-50 transition-opacity duration-500 group-hover:opacity-100`} />
            <div className="relative flex items-start justify-between">
              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <h2 className="text-3xl font-bold tracking-tight">{stat.value}</h2>
              </div>
              <div className={`p-3 rounded-2xl ${stat.bgColor} ${stat.color} ring-1 ring-inset ${stat.border} shadow-inner`}>
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

      {/* Profile Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 rounded-2xl border bg-card text-card-foreground p-6 shadow-sm flex flex-col items-center text-center gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10"></div>
          <div className="h-24 w-24 rounded-full bg-primary/20 text-primary flex items-center justify-center text-4xl font-bold shadow-inner">
            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user.name || "—"}</h2>
            <p className="text-muted-foreground flex items-center justify-center gap-2 mt-1 text-sm">
              <Mail className="w-4 h-4" /> {user.email || "—"}
            </p>
          </div>
          <div className="w-full h-px bg-border"></div>
          <div className="w-full flex flex-col gap-3 text-sm text-left">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-muted rounded-md"><Phone className="w-4 h-4 text-muted-foreground" /></div>
              <span>{profile.contactNo || "No contact provided"}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-muted rounded-md"><MapPin className="w-4 h-4 text-muted-foreground" /></div>
              <span className="truncate">{profile.address || "No address provided"}</span>
            </div>
          </div>
        </div>

        {/* Recent Orders Preview */}
        <div className="col-span-1 md:col-span-2 rounded-2xl border bg-card text-card-foreground p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-muted-foreground gap-2">
              <ShoppingBag className="w-12 h-12 opacity-30" />
              <p>No orders yet. Start exploring our menu!</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {orders.slice(0, 5).map((order: any) => (
                <div key={order.id} className="flex items-center justify-between rounded-xl bg-muted/40 px-4 py-3">
                  <div>
                    <p className="font-medium text-sm">{order.mealName}</p>
                    <p className="text-xs text-muted-foreground">Qty: {order.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">{order.totalPrice}tk</p>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      order.status === "CANCELLED"
                        ? "bg-red-500/10 text-red-500"
                        : order.status === "DELIVERED" || order.status === "READY"
                        ? "bg-emerald-500/10 text-emerald-500"
                        : "bg-amber-500/10 text-amber-500"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
