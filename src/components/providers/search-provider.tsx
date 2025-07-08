'use client';
import { createContext, type ReactNode, useState } from 'react';

type SearchStore = {
  search: string;
  filter: string;
  setSearch: (value: string) => void;
  setFilter: (value: string) => void;
};

export const SearchContext = createContext<SearchStore | undefined>(undefined);
export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const value = {
    search,
    setSearch,
    filter,
    setFilter,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
