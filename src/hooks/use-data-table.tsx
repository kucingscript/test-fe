import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import type { ApiResponse } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

type Fetcher<T> = (params: {
  page: number;
  q: string;
  limit: number;
}) => Promise<ApiResponse<T[]>>;

export const useDataTable = <TData,>(
  fetcher: Fetcher<TData>,
  queryKey: string,
  initialPage: number,
  initialLimit: number = 10
) => {
  const [page, setPage] = useState(initialPage);
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(initialLimit);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setPage(1);
    }
  }, [debouncedSearchTerm]);

  const {
    data: response,
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: [queryKey, { page, q: debouncedSearchTerm, limit }],
    queryFn: async () => {
      try {
        return await fetcher({
          page,
          q: debouncedSearchTerm,
          limit,
        });
      } catch (error: any) {
        if (error.response && error.response.status === 500) {
          return {
            code: 500,
            request_id: "",
            message: "Internal Server Error",
            data: [],
            pageInfo: null,
          };
        }
        throw error;
      }
    },
    placeholderData: (previousData) => previousData,
    retry: false,
  });

  const data = response?.code === 0 ? response.data : [];
  const pageInfo = response?.pageInfo ?? null;

  return {
    data,
    pageInfo,
    loading: isLoading,
    isFetching,
    isError,
    page,
    setPage,
    limit,
    setLimit,
    searchTerm,
    setSearchTerm,
  };
};
