import Column from "./table.utils";

export interface ColumnOptions<
  T extends Record<string, unknown> = Record<string, unknown>,
> {
  cell?: (data: T) => React.ReactNode;
  header?: string | (() => React.ReactNode);
}

export interface TableProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> {
  data: T[];
  columns: Column<T>[];
}
