import { useContext } from 'react';
import { FavoritesContext } from '@/components/providers/favorites-provider';
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a favorites-provider');
  }

  return context;
};
