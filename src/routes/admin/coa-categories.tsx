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
import Loader from "@/components/Loader";
import { useEffect } from "react";

export const Route = createFileRoute("/admin/coa-categories")({
  validateSearch: (search: Record<string, unknown>) => ({
    page: Number(search.page ?? 1),
  }),
  component: RouteComponent,
});

const columns: ColumnDef<CategoryCOA>[] = [
  {
    accessorKey: "category_id",
    header: "ID Kategori",
  },
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "account_type",
    header: "Tipe Akun",
  },
  {
    accessorKey: "normal_balance",
    header: "Saldo Normal",
  },
  {
    accessorKey: "report_position",
    header: "Posisi Laporan",
  },
];

function RouteComponent() {
  const navigate = useNavigate({ from: Route.fullPath });
  const { page: initialPage } = useSearch({ from: Route.fullPath });

  const {
    data,
    pageInfo,
    loading,
    error,
    page,
    setPage,
    searchTerm,
    setSearchTerm,
  } = useDataTable(
    getCategoryCOA,
    "coa-categories",
    "Failed to fetch categories",
    initialPage
  );

  useEffect(() => {
    navigate({ search: { page }, replace: true });
  }, [page, navigate]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount: pageInfo?.total ?? 0,
  });

  if (error && data.length === 0) {
    return (
      <div className="p-6 text-center text-red-500">
        Error: {(error as Error).message}
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Category COA</h1>
        <Input
          placeholder="Cari berdasarkan nama..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {loading && data.length === 0 ? (
        <Loader />
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
                {table.getRowModel().rows.length > 0 ? (
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
              Halaman {page} dari {pageInfo?.totalPage ?? 1}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(page - 1)}
                disabled={page <= 1}
              >
                Sebelumnya
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(page + 1)}
                disabled={page >= (pageInfo?.totalPage ?? 1)}
              >
                Berikutnya
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
