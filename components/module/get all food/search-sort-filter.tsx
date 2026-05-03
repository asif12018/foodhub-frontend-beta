"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function SearchSortFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    // Reset to page 1 on new search
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "default") {
      params.set("sortBy", value);
    } else {
      params.delete("sortBy");
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between items-center my-6">
      <div className="relative w-full md:w-1/2 lg:w-1/3">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-4 h-4 text-muted-foreground" />
        </div>
        <Input
          type="text"
          placeholder="Search for food..."
          className="pl-10"
          defaultValue={searchParams.get("search") || ""}
          onChange={(e) => {
            const timeoutId = setTimeout(() => handleSearch(e.target.value), 500);
            return () => clearTimeout(timeoutId);
          }}
        />
      </div>

      <div className="w-full md:w-48">
        <select
          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          defaultValue={searchParams.get("sortBy") || "default"}
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="default">Sort by</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}
