import { useInfiniteQuery } from '@tanstack/react-query';
import { ItemsResponse } from './types';

export async function fetchItems({
  pageParam,
}: {
  pageParam: number;
}): Promise<ItemsResponse> {
  const res = await fetch(`/api/items?page=${pageParam}`);

  if (!res) throw new Error('Something went wrong while fetching items');

  return await res.json();
}

export const useFetchItemsInfiniteQuery = () =>
  useInfiniteQuery({
    queryKey: ['items'],
    queryFn: fetchItems,
    initialPageParam: 0,
    getNextPageParam: (lastpage) => lastpage.nextPage,
  });
