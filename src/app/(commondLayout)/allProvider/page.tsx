import { ProviderCard } from "@/components/ui/ProviderCard";
import { getAllProviderAction } from "@/server action/profile.action";
import React from "react";

export default async function AllProviderPage() {
  const { data, error } = await getAllProviderAction();

  return (
    <div>
      <div>
        <h1 className="text-4xl font-bold text-center my-5">All Provider</h1>
      </div>
      {error && (
        <div className="text-center text-red-500">Something went wrong</div>
      )}
      <div className="grid grid-cols-4 gap-3 md:grid-cols-3 sm:grid-cols-2">
        {data?.data?.map((provider: any) => (
          <ProviderCard key={provider.id} provider={provider} />
        ))}
      </div>
    </div>
  );
}
