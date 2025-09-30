'use client';

import { useFetchItemsInfiniteScrollquery } from '@/lib/client-queries';
import { Item } from './Item';
import { useEffect, useRef } from 'react';

export const InfiniteListWithAutoLoad = () => {
  const {
    data,
    error,
    status,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useFetchItemsInfiniteScrollquery();

  const loadMoreRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver>(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const totalLoaded =
    data?.pages.reduce((acc, page) => acc + page.data.length, 0) || 0;

  if (status === 'pending')
    return <div className='text-center'>Loading...</div>;

  if (status === 'error')
    return <div className='text-center'>Error: {error?.message}</div>;

  return (
    <div className='space-y-4'>
      <div className='h-[50vh] w-full overflow-auto rounded-md border p-4'>
        {data.pages.map((page, pageIndex) => (
          <div key={pageIndex}>
            {page.data.map((item) => (
              <Item key={item.id} name={item.name} />
            ))}
          </div>
        ))}

        <div
          ref={loadMoreRef}
          className='flex h-10 items-center justify-center'
        >
          {isFetchingNextPage && <div>Loading more items...</div>}
        </div>
      </div>

      <div className='text-center'>
        <p>You have loaded {totalLoaded} items</p>

        {!hasNextPage && totalLoaded > 0 ? (
          <div>All items loaded!</div>
        ) : (
          <p className='mt-2 text-sm text-gray-500 italic'>
            Scroll down to load more items
          </p>
        )}
      </div>
    </div>
  );
};
