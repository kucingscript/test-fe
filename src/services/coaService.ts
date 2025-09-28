import apiClient from "@/lib/api";
import type { CategoryCOAResponse } from "@/types/coa";

interface GetCategoryCOAParams {
  q?: string;
  page?: number;
  limit?: number;
}

export const getCategoryCOA = async (
  params: GetCategoryCOAParams = {}
): Promise<CategoryCOAResponse> => {
  const res = await apiClient.get<CategoryCOAResponse>("/category-coa", {
    params,
  });
  return res.data;
};
