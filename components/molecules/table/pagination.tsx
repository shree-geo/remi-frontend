import { Button } from "@/components/ui/button";
import {
  Pagination as PaginationAtom,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationPropsBase {
  total: number;
  searchParams: Awaited<PageProps<never>["searchParams"]>;
}

type PaginationProps = PaginationPropsBase;

export default function Pagination(props: PaginationProps) {
  const { searchParams, total = 0 } = props;
  const offset = searchParams?.offset
    ? parseInt(searchParams.offset as string, 10)
    : 0;
  const limit = searchParams?.limit
    ? parseInt(searchParams.limit as string, 10)
    : 10;
  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.ceil(offset / limit) + 1;
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const hasPrevPage = prevPage > 0;
  const hasNextPage = nextPage <= totalPages;

  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);
  const prevPages = Array.from(
    { length: Math.min(2, currentPage - 1) },
    (_, i) => currentPage - (1 - i)
  );
  const nextPages = Array.from(
    { length: Math.min(2, totalPages - currentPage) },
    (_, i) => currentPage + (i + 1)
  );

  const getPaginatedUrl = (page: number, limit: number = 10) => {
    const newOffset = (page - 1) * limit;
    const newSearchParams = new URLSearchParams();
    newSearchParams.set("offset", newOffset.toString());
    newSearchParams.set("limit", limit.toString());
    return `?${newSearchParams.toString()}`;
  };

  return (
    <PaginationAtom>
      <PaginationContent>
        {hasPrevPage && (
          <PaginationItem>
            <PaginationPrevious href={getPaginatedUrl(prevPage, limit)} />
          </PaginationItem>
        )}
        {startPage > 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {prevPages.map((page, i) => {
          return (
            <PaginationItem key={i}>
              <PaginationLink href={getPaginatedUrl(page, limit)}>
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <Button size="icon-sm" asChild>
            <PaginationLink href="#">{currentPage}</PaginationLink>
          </Button>
        </PaginationItem>
        {nextPages.map((page, i) => {
          return (
            <PaginationItem key={i}>
              <PaginationLink href={getPaginatedUrl(page, limit)}>
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        {endPage < totalPages && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {hasNextPage && (
          <PaginationItem>
            <PaginationNext href={getPaginatedUrl(nextPage, limit)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </PaginationAtom>
  );
}
