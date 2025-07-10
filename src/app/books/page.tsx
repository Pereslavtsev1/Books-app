'use client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getBooks } from '@/api/queries';
import BooksList from '@/components/general/main/books-list';
import SearchBar from '@/components/general/main/search-bar';
import { useSearch } from '@/hooks/useSearch';
import type { BookVolume } from '@/utils/types';

export default function Home() {
  const { search, filter } = useSearch();
  const { data } = useSuspenseQuery<BookVolume[]>(
    getBooks({ query: search || 'Javascript', filter: filter }),
  );
  return (
    <>
      <div className='w-full'>
        <SearchBar />
      </div>
      <BooksList books={data} />
    </>
  );
}
