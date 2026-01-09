import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HelpCircleIcon } from "lucide-react";
import STranslation from "../translations/STranslation";
import type { TableProps } from "./table.definition";

export default function SuperTable<
  T extends Record<string, unknown> = Record<string, unknown>
>({ data, columns }: TableProps<T>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column, i) => {
            return (
              <TableHead
                key={i}
                className="text-muted-foreground font-semibold"
              >
                {column.header()}
              </TableHead>
            );
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((d, i) => (
          <TableRow key={i}>
            {columns.map((column, colIndex) => {
              return <TableCell key={colIndex}>{column.cell(d)}</TableCell>;
            })}
          </TableRow>
        ))}
        {data.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={columns.length}
              className="py-8 text-center bg-background/10"
            >
              <div className="flex flex-col items-center gap-4 p-8 rounded-xl">
                <HelpCircleIcon className="h-24 w-24 text-foreground/50" />
                <span className="scroll-m-20 text-center text-xl font-medium tracking-tight text-balance text-foreground">
                  <STranslation tKey="table.noData" />
                </span>
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
