import { InfiniteListWithAutoLoad } from '@/components/InfiniteListWithAutoLoad';
import { InfiniteListWithLoadMoreButton } from '@/components/InfiniteListWithLoadMoreButton';

export default function Home() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-24'>
      <h1 className='mb-8 text-center text-4xl font-bold'>
        What would you do if you had to show more items than the client could
        handle?
      </h1>

      <p className='mb-4 max-w-2xl text-center text-sm text-gray-500'>
        - Instead of overwhelming the browser with thousands of elements at
        once, a smarter approach is to load content gradually. Infinite scroll
        (or a simple “Load More” button) improves performance, reduces memory
        usage, and keeps the experience smooth for the user.
      </p>

      <p className='mb-10 max-w-2xl text-center text-sm text-gray-500'>
        - Below you can see two common ways to implement infinite loading: one
        with a “Load More” button, and the other with automatic loading
        triggered by scrolling.
      </p>

      <div className='grid w-full grid-cols-1 gap-8 md:grid-cols-2'>
        <InfiniteListWithLoadMoreButton />

        <InfiniteListWithAutoLoad />
      </div>
    </div>
  );
}
