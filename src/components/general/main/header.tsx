'use client';
import { Heart, Library, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

const Header = () => {
  const { setTheme, theme } = useTheme();
  return (
    <header className='flex items-center justify-between py-4'>
      <div className='felx gap-x-2'>
        <Library />
        <h1 className='hidden text-lg font-bold sm:flex'>BooksCatalog</h1>
      </div>
      <div className='flex items-center gap-x-2'>
        <Button variant='ghost' className='font-semibold'>
          <Heart />
          <span className='hidden sm:flex'>Избраное</span>
        </Button>
        <Button
          variant={'ghost'}
          onClick={() =>
            setTheme((theme) => (theme === 'dark' ? 'light' : 'dark'))
          }
        >
          {theme === 'dark' ? <Sun /> : <Moon />}
        </Button>
      </div>
    </header>
  );
};

export default Header;
