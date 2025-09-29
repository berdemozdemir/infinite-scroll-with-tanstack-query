import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchItems } from "./fetch-items";

export const useFetchItemsInfiniteQuery = () =>
  useInfiniteQuery({
    queryKey: ["items"],
    queryFn: fetchItems,
    initialPageParam: 0,
    getNextPageParam: (lastpage) => lastpage.nextPage,
  });
