import TableWithPaginationDemo from "@/components/table-05";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getMyMenu } from "@/server action/food.action";
import React from "react";

export default async function MyMenuPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
  }>;
}) {
  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams.page) || 1;
  const { data, error } = await getMyMenu({ page: currentPage });

  //pagination code

  const pagination = data?.data?.pagination;
  const totalPages = pagination?.totalPage || 1;

  //helper function for pagination

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams();
    params.set("page", pageNumber.toString());
    return `?${params.toString()}`;
  };

  return (
    <div className="container mx-auto">
      <TableWithPaginationDemo value={data?.data?.data} />

      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={currentPage <= 1 ? "#" : createPageURL(currentPage - 1)}
              className={
                currentPage <= 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href={createPageURL(page)}
                isActive={currentPage === page}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {totalPages > 3 && <PaginationEllipsis />}

          <PaginationItem>
            <PaginationNext
              href={
                currentPage >= totalPages ? "#" : createPageURL(currentPage + 1)
              }
              className={
                currentPage >= totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
