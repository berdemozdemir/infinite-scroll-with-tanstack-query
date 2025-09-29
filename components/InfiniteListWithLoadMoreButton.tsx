'use client';

import { useFetchItemsInfiniteQuery } from '@/lib/client-queries';
import { Item } from './Item';

export const InfiniteListWithLoadMoreButton = () => {
  const {
    data,
    error,
    status,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useFetchItemsInfiniteQuery();

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

        {isFetchingNextPage && <div>loading...</div>}
      </div>

      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          className='cursor-pointer rounded-md border px-3 py-2 shadow-2xl transition-all hover:translate-x-0.5 hover:translate-y-0.5'
        >
          {isFetchingNextPage ? 'loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
};
