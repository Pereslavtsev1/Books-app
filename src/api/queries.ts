import { queryOptions } from '@tanstack/react-query';
import type { BookVolume } from '@/utils/types';

type GetBooksProps = {
  query: string;
  filter?: string;
};

export const getBooks = ({ query, filter }: GetBooksProps) =>
  queryOptions<BookVolume[]>({
    queryKey: ['books', query, filter],
    queryFn: async () => {
      let url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`;

      if (filter) {
        url += `&filter=${encodeURIComponent(filter)}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      return data.items;
    },
  });
