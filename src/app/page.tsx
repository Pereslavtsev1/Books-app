'use server';
import { getBooks } from '@/api/queries';
import BooksList from '@/components/general/main/books-list';
import Header from '@/components/general/main/header';
import SearchBar from '@/components/general/main/search-bar';
import { getQueryClient } from '@/utils/functions';

export default async function Home() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(getBooks({ query: 'javascript' }));
  return (
    <main className='px-2 sm:px-4 md:px-6 lg:px-8'>
      <Header />
      <div className='w-full'>
        <SearchBar />
      </div>
      <BooksList />
    </main>
  );
}
