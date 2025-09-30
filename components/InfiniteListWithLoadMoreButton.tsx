'use client';

import { useFetchItemsInfiniteQuery } from '@/lib/client-queries';
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
  } = useFetchItemsInfiniteQuery();

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isFetchingNextPage) {
      ref.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isFetchingNextPage]);

  if (status === 'pending')
    return <div className='text-center'>Loading...</div>;

  if (status === 'error')
    return <div className='text-center'>Error:{error.message}</div>;

  return (
    <div className='space-y-4'>
      <div className='h-[50vh] w-full overflow-auto rounded-md border p-4'>
        {data.pages.map((page, index) => (
          <div key={index}>
            <div>
              {page.data.map((item, i) => (
                <Item key={i} name={item.name} />
              ))}
            </div>
          </div>
        ))}

        {isFetchingNextPage && (
          <div ref={ref} className='mt-2 mb-6 text-center'>
            loading...
          </div>
        )}
      </div>

      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          className='cursor-pointer rounded-md border px-3 py-2'
        >
          {isFetchingNextPage ? 'loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
};
