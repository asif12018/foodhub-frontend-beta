import { redirect } from "next/navigation";

export default function ProviderDashboardIndex() {
  redirect("/dashboard/providerStats");
}
