import type { CategoryCOA } from "@/types/coa";
import {
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin/coa-categories")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      page: Number(search.page ?? 1),
      q: String(search.q ?? ""),
    };
  },
  component: RouteComponent,
});

const columnHelper = createColumnHelper<CategoryCOA>();
const columns = [
  columnHelper.accessor("category_id", {
    header: "ID Kategori",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("name", {
    header: "Nama",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("account_type", {
    header: "Tipe Akun",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("normal_balance", {
    header: "Saldo Normal",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("report_position", {
    header: "Posisi Laporan",
    cell: (info) => info.getValue(),
  }),
];

function RouteComponent() {
  const navigate = useNavigate({ from: Route.fullPath });
  const { page, q } = useSearch({ from: Route.fullPath });

  const { data, isLoading } = useQuery({
    queryKey: ["coa-categories", { page, q }],
    queryFn: () => getCategoryCOA({ page, q, limit: 10 }),
    keepPreviousData: true,
  });

  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    rowCount: data?.pageInfo.total ?? 0,
    state: {
      pagination: {
        pageIndex: page - 1,
        pageSize: 10,
      },
    },
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = event.target.value;
    navigate({
      search: (prev) => ({ ...prev, q: newSearch, page: 1 }),
      replace: true,
    });
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Category COA</h1>

      <Input
        placeholder="Cari berdasarkan nama..."
        value={q}
        onChange={handleSearch}
        className="max-w-sm"
      />

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  {columns.map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton className="w-full h-5" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Halaman {page} dari {data?.pageInfo.totalPage ?? 1}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              navigate({ search: (prev) => ({ ...prev, page: page - 1 }) })
            }
            disabled={page <= 1}
          >
            Sebelumnya
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              navigate({ search: (prev) => ({ ...prev, page: page + 1 }) })
            }
            disabled={page >= (data?.pageInfo.totalPage ?? 1)}
          >
            Berikutnya
          </Button>
        </div>
      </div>
    </div>
  );
}
