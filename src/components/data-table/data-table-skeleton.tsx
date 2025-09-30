import type { ColumnDef } from "@tanstack/react-table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TableSkeletonProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  rowCount?: number;
}

export function TableSkeleton<TData, TValue>({
  columns,
  rowCount = 10,
}: TableSkeletonProps<TData, TValue>) {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.id || Math.random()}>
                {typeof column.header === "string" ? column.header : ""}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: rowCount }).map((_, rowIndex) => (
            <TableRow key={`skeleton-row-${rowIndex}`}>
              {columns.map((column) => (
                <TableCell key={`skeleton-cell-${column.id || Math.random()}`}>
                  <Skeleton className="h-4 w-full" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
