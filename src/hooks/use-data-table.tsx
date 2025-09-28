import { useState } from "react";
import { toast } from "sonner";
import { useDebounce } from "@/hooks/use-debounce";
import type { ApiResponse } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

type Fetcher<T> = (params: {
  page: number;
  q: string;
}) => Promise<ApiResponse<T[]>>;

export const useDataTable = <TData,>(
  fetcher: Fetcher<TData>,
  queryKey: string,
  defaultErrorMessage: string,
  initialPage: number
) => {
  const [page, setPage] = useState(initialPage);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const {
    data: response,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: [queryKey, { page, q: debouncedSearchTerm }],
    queryFn: async () => {
      try {
        const currentPage = debouncedSearchTerm !== "" && page !== 1 ? 1 : page;
        if (debouncedSearchTerm !== "" && page !== 1) {
          setPage(1);
        }

        const result = await fetcher({
          page: currentPage,
          q: debouncedSearchTerm,
        });
        if (result.code !== 0) {
          toast.error(result.message);
          throw new Error(result.message);
        }
        return result;
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || defaultErrorMessage;
        toast.error(errorMessage);
        throw new Error(errorMessage);
      }
    },
    placeholderData: (previousData) => previousData,
  });

  const data = response?.data ?? [];
  const pageInfo = response?.pageInfo ?? null;

  return {
    data,
    pageInfo,
    loading,
    error,
    page,
    setPage,
    searchTerm,
    setSearchTerm,
  };
};
