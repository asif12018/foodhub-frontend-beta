import { redirect } from "next/navigation";

export default function AdminDashboardIndex() {
  redirect("/dashboard/adminStats");
}
