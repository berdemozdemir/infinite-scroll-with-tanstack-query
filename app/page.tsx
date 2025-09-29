export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold text-center mb-8">
        What would you do if you had to show more items than the client could
        handle?
      </h1>

      <p className="text-center text-sm max-w-2xl text-gray-500 mb-4">
        - Instead of overwhelming the browser with thousands of elements at
        once, a smarter approach is to load content gradually. Infinite scroll
        (or a simple “Load More” button) improves performance, reduces memory
        usage, and keeps the experience smooth for the user.
      </p>

      <p className="text-center text-sm max-w-2xl text-gray-500">
        - Below you can see two common ways to implement infinite loading: one
        with a “Load More” button, and the other with automatic loading
        triggered by scrolling.
      </p>
    </div>
  );
}
