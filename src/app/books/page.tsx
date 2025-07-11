import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { booksOptions } from '@/api/queries';
import CatalogPageContent from '@/components/general/main/content';
import { getQueryClient } from '@/utils/functions';

export default async function Home({
  searchParams,
}: {
  searchParams: { search?: string };
}) {
  const { search } = await searchParams;
  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery(
    booksOptions({ query: search || 'javascript' }),
  );

  console.log(dehydrate(queryClient));
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogPageContent />
    </HydrationBoundary>
  );
}
