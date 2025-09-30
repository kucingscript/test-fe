import type { CategoryCOA } from "@/types/coa";
import {
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from "@tanstack/react-table";
import { getCategoryCOA } from "@/services/coaService";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useDataTable } from "@/hooks/use-data-table";
import { useCallback, useEffect } from "react";
import { PlusCircle, Search } from "lucide-react";
import DataTablePagination from "@/components/Pagination";
import { TableSkeleton } from "@/components/TableSkeleton";

export const Route = createFileRoute("/admin/coa-categories")({
  validateSearch: (search: Record<string, unknown>) => ({
    page: Number(search.page ?? 1),
    limit: Number(search.limit ?? 10),
  }),
  component: RouteComponent,
});

const columns: ColumnDef<CategoryCOA>[] = [
  { accessorKey: "category_id", header: "ID Kategori" },
  { accessorKey: "name", header: "Nama" },
  { accessorKey: "account_type", header: "Tipe Akun" },
  { accessorKey: "normal_balance", header: "Saldo Normal" },
  { accessorKey: "report_position", header: "Posisi Laporan" },
];

function RouteComponent() {
  const navigate = useNavigate({ from: Route.fullPath });
  const { page: initialPage, limit: initialLimit } = useSearch({
    from: Route.fullPath,
  });

  const {
    data,
    pageInfo,
    loading,
    isFetching,
    isError,
    page,
    setPage,
    limit,
    searchTerm,
    setSearchTerm,
  } = useDataTable(getCategoryCOA, "coa-categories", initialPage, initialLimit);

  const handleSetPage = useCallback(
    (newPage: number) => {
      setPage(newPage);
    },
    [setPage]
  );

  useEffect(() => {
    navigate({ search: { page, limit }, replace: true });
  }, [page, limit, navigate]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount: pageInfo?.total ?? 0,
  });

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center gap-4">
        <h1 className="text-2xl font-bold">Category COA</h1>
        <div className="flex gap-2 items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari berdasarkan nama..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 max-w-sm"
            />
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Tambah Kategori
          </Button>
        </div>
      </div>

      {loading && data.length === 0 ? (
        <TableSkeleton columns={columns} rowCount={limit} />
      ) : (
        <>
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
                setPage={handleSetPage}
                isFetching={isFetching}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
