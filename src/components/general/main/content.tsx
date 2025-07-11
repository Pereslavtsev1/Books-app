'use client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { booksOptions } from '@/api/queries';
import BookCard, {
  BookCardSkeleton,
} from '@/components/general/main/book-card';
import SearchBar from '@/components/general/main/search-bar';
import { useSearch } from '@/hooks/useSearch';
import type { BooksApiResponse } from '@/utils/types';

export default function CatalogPageContent() {
  const { search, filter } = useSearch();
  const { ref, inView } = useInView();

  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery<BooksApiResponse>(
      booksOptions({ query: search || 'javascript', filter }),
    );
  const handleFetchNextPage = useCallback(() => {
    if (inView && !isFetchingNextPage && data?.pages.length) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, isFetchingNextPage, data]);

  useEffect(() => {
    handleFetchNextPage();
  }, [handleFetchNextPage]);

  return (
    <>
      <SearchBar />
      <div className='grid grid-cols-1 gap-x-6 gap-y-3 md:grid-cols-2 xl:grid-cols-4'>
        {isLoading &&
          Array.from({ length: 10 }).map((_, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <BookCardSkeleton key={index} />
          ))}
        {data?.pages.map((page, pageIndex) =>
          page.items.map((book) => (
            <BookCard key={`${book.id}-${pageIndex}`} book={book} />
          )),
        )}
        {isFetchingNextPage &&
          Array.from({ length: 4 }).map((_, index) => (
            <BookCardSkeleton
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={`skeleton-${index}`}
            />
          ))}
      </div>
      <div ref={ref} className='h-10' />
    </>
  );
}
