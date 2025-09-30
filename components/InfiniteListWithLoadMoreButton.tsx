'use client';

import { useFetchItemsInfiniteLoadmoreQuery } from '@/lib/client-queries';
import { Item } from './Item';
import { useEffect, useRef } from 'react';

export const InfiniteListWithLoadMoreButton = () => {
  const {
    data,
    error,
    status,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useFetchItemsInfiniteLoadmoreQuery();

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isFetchingNextPage) {
      ref.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isFetchingNextPage]);

  const countLoadedItem = data?.pages.reduce(
    (acc, page) => acc + page.data.length,
    0
  );

  if (status === 'pending')
    return <div className='text-center'>Loading...</div>;

  if (status === 'error')
    return <div className='text-center'>Error: {error.message}</div>;

  return (
    <div className='space-y-4'>
      <div className='h-[50vh] w-full overflow-auto rounded-md border p-4'>
        {data.pages.map((page, index) => (
          <div key={index}>
            {page.data.map((item, i) => (
              <Item key={i} name={item.name} />
            ))}
          </div>
        ))}

        {isFetchingNextPage && (
          <div ref={ref} className='mt-2 mb-6 text-center'>
            loading...
          </div>
        )}
      </div>

      <div className='flex flex-col items-center justify-center gap-2'>
        <p>
          You have loaded {countLoadedItem} out of {data.pages[0].totalCount}{' '}
          items.
        </p>

        {hasNextPage && (
          <button
            onClick={() => fetchNextPage()}
            className='w-fit cursor-pointer rounded-md border px-3 py-2'
          >
            {isFetchingNextPage ? 'loading...' : 'Load More'}
          </button>
        )}
      </div>
    </div>
  );
};
