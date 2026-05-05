import { redirect } from "next/navigation";

export default function UserDashboardIndex() {
  redirect("/dashboard/userStats");
}
