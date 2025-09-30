import {
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { getCategoryCOA } from "@/services/coaService";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDataTable } from "@/hooks/use-data-table";
import { useCallback, useEffect } from "react";
import { PlusCircle, Search } from "lucide-react";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/components/data-table/columns";

export const Route = createFileRoute("/admin/coa-categories")({
  validateSearch: (search: Record<string, unknown>) => ({
    page: Number(search.page ?? 1),
    limit: Number(search.limit ?? 10),
  }),
  component: RouteComponent,
});

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

      <DataTable
        columns={columns}
        data={data}
        loading={loading}
        isFetching={isFetching}
        isError={isError}
        pageInfo={pageInfo}
        page={page}
        setPage={handleSetPage}
        limit={limit}
      />
    </div>
  );
}
