'use client';
import type { BookVolume } from '@/utils/types';
import BookCard from './book-card';

const BooksList = ({ books }: { books: BookVolume[] }) => {
  return (
    <div className='grid grid-cols-1 gap-x-6 gap-y-3 md:grid-cols-2 xl:grid-cols-4'>
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BooksList;
