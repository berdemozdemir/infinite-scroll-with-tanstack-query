export const ITEMS = Array.from({ length: 100 }).map((_, index) => ({
  id: index,
  name: `item ${index + 1}`,
}));

export const LIMIT = 10;
