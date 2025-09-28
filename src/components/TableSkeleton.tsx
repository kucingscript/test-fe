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

interface TableSkeletonProps<TData> {
  columns: ColumnDef<TData>[];
  rowCount?: number;
}

export function TableSkeleton<TData>({
  columns,
  rowCount = 10,
}: TableSkeletonProps<TData>) {
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
