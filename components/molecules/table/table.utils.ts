import _ from "lodash";
import { ReactNode } from "react";
import type { ColumnOptions } from "./table.definition";

export default class Column<T extends Record<string, unknown>> {
  accessorKey?: keyof T;

  cell(row: T): ReactNode {
    if (this.accessorKey) {
      return row[this.accessorKey] as ReactNode;
    }
  }
  header(): ReactNode {
    if (this.accessorKey) {
      return _.upperFirst(this.accessorKey.toString());
    }
    return "No header";
  }

  constructor(accessorKey: keyof T | undefined, options?: ColumnOptions<T>) {
    this.accessorKey = accessorKey;
    if (options?.cell) {
      this.cell = options.cell;
    }
    if (options?.header) {
      if (typeof options.header === "string") {
        this.header = () => options.header as string;
      } else {
        this.header = options.header as () => ReactNode;
      }
    }
  }

  static display<T extends Record<string, unknown> = Record<string, unknown>>(
    options: Required<ColumnOptions<T>>,
  ): Column<T> {
    return new Column(undefined, options);
  }
}
