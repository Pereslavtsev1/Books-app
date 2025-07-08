'use client';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getBooks } from '@/api/queries';
import type { BookVolume } from '@/utils/types';
import BookCard from './book-card';

const BooksList = () => {
  const { data } = useSuspenseQuery<BookVolume[]>(getBooks);
  console.log(data);
  return (
    <div className='grid grid-cols-1 gap-x-6 gap-y-3 md:grid-cols-2 xl:grid-cols-4'>
      {data.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BooksList;
