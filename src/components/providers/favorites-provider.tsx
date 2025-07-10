'use client';
import { createContext, type ReactNode, useEffect, useState } from 'react';
import type { BookVolume } from '@/utils/types';

type FavoritesStore = {
  favorites: BookVolume[];
  setFavorites: (value: BookVolume[]) => void;
};

export const FavoritesContext = createContext<FavoritesStore | undefined>(
  undefined,
);
export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<BookVolume[]>([]);
  const value = { favorites, setFavorites };
  useEffect(() => {
    const t = localStorage.getItem('favorites');
    if (t) setFavorites(JSON.parse(t));
  }, []);
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
