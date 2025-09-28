import type { ApiResponse, PageInfo } from "./types";

export interface CategoryCOA {
  category_id: string;
  name: string;
  account_type:
    | "ASSET"
    | "LIABILITY"
    | "EQUITY"
    | "REVENUE"
    | "EXPENSE"
    | "COGS"
    | "OTHER";
  normal_balance: "DEBIT" | "CREDIT";
  report_position: "NERACA" | "LABA_RUGI" | "ARUS_KAS" | "LAINNYA";
  description: string;
  deleted: 0 | 1;
}

export type CategoryCOAResponse = ApiResponse<CategoryCOA[]> & {
  pageInfo: PageInfo;
};
