import { queryOptions } from '@tanstack/react-query';
import type { BookVolume } from '@/utils/types';

export const getBooks = queryOptions<BookVolume[]>({
  queryKey: ['books'],
  queryFn: async () => {
    const response = await fetch(
      'https://www.googleapis.com/books/v1/volumes?q=JavaScript',
    );
    const data = await response.json();
    return data.items;
  },
});
