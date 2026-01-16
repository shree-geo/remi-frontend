import Table from "@/components/molecules/table";
import Pagination from "@/components/molecules/table/pagination";
import { ComponentProps } from "react";
import ListHeader from "./listHeader";

interface ListProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> {
  headerProps: ComponentProps<typeof ListHeader>;
  tableProps: ComponentProps<typeof Table<T>>;
  paginationProps: ComponentProps<typeof Pagination>;
}

export default function List<
  T extends Record<string, unknown> = Record<string, unknown>,
>(props: ListProps<T>) {
  return (
    <div className="flex flex-col items-stretch space-y-4">
      <ListHeader {...props.headerProps} />
      <Table {...props.tableProps} />
      <Pagination {...props.paginationProps} />
    </div>
  );
}
