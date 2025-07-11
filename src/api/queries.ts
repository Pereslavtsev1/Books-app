import { infiniteQueryOptions } from '@tanstack/react-query';
import type { BooksApiResponse } from '@/utils/types';

export const getBooks = async ({
  query,
  limit = 10,
  pageParam = 0,
  filter,
}: {
  query: string;
  limit?: number;
  pageParam?: unknown;
  filter?: string;
}) => {
  let url = `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${pageParam}&maxResults=${limit}`;
  if (filter) {
    url += `&filter=${encodeURIComponent(filter)}`;
  }
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch books');
  }
  return response.json();
};

export const booksOptions = ({
  limit = 10,
  query,
  filter,
}: {
  query: string;
  limit?: number;
  filter?: string;
}) =>
  infiniteQueryOptions<BooksApiResponse>({
    queryKey: ['books', query, filter],
    queryFn: ({ pageParam }) => getBooks({ query, limit, pageParam, filter }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.items.length === limit ? allPages.length + 1 : undefined;
    },
    initialPageParam: 0,
  });
