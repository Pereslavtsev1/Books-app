'use server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getBooks } from '@/api/queries';
import BooksList from '@/components/general/main/books-list';
import Header from '@/components/general/main/header';
import { getQueryClient } from '@/utils/functions';

export default async function Home() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(getBooks);
  return (
    <main>
      <Header />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <BooksList />
      </HydrationBoundary>
    </main>
  );
}
