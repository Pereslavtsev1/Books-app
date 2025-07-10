'use client';
import { Heart, Library, Moon, Sun } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const { setTheme, theme } = useTheme();
  const param = usePathname();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const isFavoritePage = param.includes('/books/favorites');
  return (
    <header className='flex items-center justify-between py-4'>
      <div className='flex items-center gap-x-2'>
        <Library />
        <h1 className='text-lg font-bold'>BooksCatalog</h1>
      </div>
      <div className='flex items-center gap-x-2'>
        <Button
          variant='ghost'
          className='font-semibold'
          onClick={() =>
            router.push(!isFavoritePage ? '/books/favorites' : '/books')
          }
        >
          {!isFavoritePage ? (
            <>
              <Heart />
              <span className='hidden sm:flex'>Favorites</span>
            </>
          ) : (
            <>
              <Library />
              <span className='hidden sm:flex'>Catalog</span>
            </>
          )}
        </Button>
        <Button
          variant={'ghost'}
          onClick={() =>
            setTheme((theme) => (theme === 'dark' ? 'light' : 'dark'))
          }
        >
          {isMounted && theme === 'dark' ? <Sun /> : <Moon />}
        </Button>
      </div>
    </header>
  );
};

export default Header;
