'use client';
import { Heart, Library, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const { setTheme, theme } = useTheme();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <header className='flex items-center justify-between py-4'>
      <div className='flex items-center gap-x-2'>
        <Library />
        <h1 className='text-lg font-bold'>BooksCatalog</h1>
      </div>
      <div className='flex items-center gap-x-2'>
        <Button variant='ghost' className='font-semibold'>
          <Heart />
          <span className='hidden sm:flex'>Favorites</span>
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
