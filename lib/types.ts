import { ITEMS } from './constants';

export type Item = (typeof ITEMS)[number];

export type ItemsResponse = {
  data: Item[];
  nextPage: number | null;
};
