'use client';
import { Filter, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/useDebounce';
import { useSearch } from '@/hooks/useSearch';

const SearchBar = () => {
  const filters = ['ebooks', 'free-ebooks', 'full', 'paid-ebooks', 'partial'];
  const {
    search: contextSearch,
    setSearch: setContextSearch,
    setFilter,
  } = useSearch();
  const [inputValue, setInputValue] = useState(contextSearch);
  const debouncedSearchTerm = useDebounce(inputValue, 500);
  useEffect(() => {
    if (debouncedSearchTerm !== contextSearch) {
      setContextSearch(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, setContextSearch, contextSearch]);

  return (
    <div className='flex w-full items-center gap-x-2 py-6'>
      <div className='relative w-full'>
        <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-muted-foreground' />
        <Input
          placeholder='Search...'
          className='h-11 w-full px-10'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          variant='ghost'
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' className='h-11'>
            <Filter className='h-4 w-4' />
            Filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align='end'
          className='w-56 rounded-md border border-border bg-popover p-2 shadow-md'
        >
          <div className='space-y-2'>
            {filters.map((f) => (
              <Button
                key={f}
                variant='ghost'
                className='w-full justify-start'
                onClick={() => setFilter(f)}
              >
                {f}
              </Button>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SearchBar;
