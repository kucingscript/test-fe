import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DataTablePagination from "./data-table-pagination";
import { TableSkeleton } from "./data-table-skeleton";
import type { PageInfo } from "@/types/types";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading: boolean;
  isFetching: boolean;
  isError: boolean;
  pageInfo: PageInfo | null;
  page: number;
  setPage: (page: number) => void;
  limit: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  loading,
  isFetching,
  isError,
  pageInfo,
  page,
  setPage,
  limit,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount: pageInfo?.total ?? 0,
  });

  if (loading && data.length === 0) {
    return <TableSkeleton columns={columns} rowCount={limit} />;
  }

  return (
    <div className="space-y-4">
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isError ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-red-500"
                >
                  Gagal memuat data. Server mungkin sedang tidak aktif.
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Tidak ada data yang ditemukan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Menampilkan {data.length} dari {pageInfo?.total ?? 0} data.
        </div>
        {pageInfo && pageInfo.totalPage > 1 && (
          <DataTablePagination
            page={page}
            totalPage={pageInfo.totalPage}
            setPage={setPage}
            isFetching={isFetching}
          />
        )}
      </div>
    </div>
  );
}
