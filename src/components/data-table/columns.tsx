import type { CategoryCOA } from "@/types/coa";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<CategoryCOA>[] = [
  { accessorKey: "category_id", header: "ID Kategori" },
  { accessorKey: "name", header: "Nama" },
  { accessorKey: "account_type", header: "Tipe Akun" },
  { accessorKey: "normal_balance", header: "Saldo Normal" },
  { accessorKey: "report_position", header: "Posisi Laporan" },
];
