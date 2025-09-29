export async function fetchItems({ pageParam }: { pageParam: number }) {
  const res = await fetch(`/api/items?page=${pageParam}`);

  if (!res) throw new Error("Something went wrong while fetching items");

  return await res.json();
}
