'use client';
import BooksList from '@/components/general/main/books-list';
import { useFavorites } from '@/hooks/useFavorites';

const FavoritesPage = () => {
  const { favorites } = useFavorites();
  return (
    <div>
      <BooksList books={favorites} />
    </div>
  );
};

export default FavoritesPage;
