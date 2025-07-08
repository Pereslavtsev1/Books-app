'use client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getBooks } from '@/api/queries';
import { useSearch } from '@/hooks/useSearch';
import type { BookVolume } from '@/utils/types';
import BookCard from './book-card';

const BooksList = () => {
  const { search, filter } = useSearch();
  const { data } = useSuspenseQuery<BookVolume[]>(
    getBooks({ query: search || 'Javascript', filter: filter }),
  );
  return (
    <div className='grid grid-cols-1 gap-x-6 gap-y-3 md:grid-cols-2 xl:grid-cols-4'>
      {data.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BooksList;
