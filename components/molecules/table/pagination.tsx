"use client";
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
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface PaginationPropsBase {
  total: number;
  offset?: number;
  limit?: number;
}

type PaginationProps = PaginationPropsBase;

export default function Pagination(props: PaginationProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { offset = 0, limit = 10, total = 0 } = props;
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

  const handlePageChange = (page: number, limit: number = 10) => {
    const newOffset = (page - 1) * limit;
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("offset", newOffset.toString());
    newSearchParams.set("limit", limit.toString());
    router.push(`?${newSearchParams.toString()}`);
  };

  useEffect(() => {
    if (limit == null || offset == null) {
      handlePageChange(1, 10);
    }
  }, []);

  return (
    <PaginationAtom>
      <PaginationContent>
        {hasPrevPage && (
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(prevPage);
              }}
            />
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
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(page);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <Button size="icon-sm">
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage);
              }}
            >
              {currentPage}
            </PaginationLink>
          </Button>
        </PaginationItem>
        {nextPages.map((page, i) => {
          return (
            <PaginationItem key={i}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(page);
                }}
              >
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
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(nextPage);
              }}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </PaginationAtom>
  );
}
