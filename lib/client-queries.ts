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

export const useFetchItemsInfiniteLoadmoreQuery = () =>
  useInfiniteQuery({
    queryKey: ['fetch-items-with-load-more-button'],
    queryFn: fetchItems,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

export const useFetchItemsInfiniteScrollquery = () =>
  useInfiniteQuery({
    queryKey: ['fetch-items-with-scroll'],
    queryFn: fetchItems,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
