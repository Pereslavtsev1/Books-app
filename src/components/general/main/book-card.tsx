import { Heart, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useFavorites } from '@/hooks/useFavorites';
import { cn } from '@/lib/utils';
import type { BookVolume } from '@/utils/types';

const BookCard = ({ book }: { book: BookVolume }) => {
  const { favorites, setFavorites } = useFavorites();
  const isFavorite = favorites.some((fav) => fav.id === book.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav.id !== book.id));
      toast.success('Book removed from favorites successfully');
    } else {
      setFavorites([...favorites, book]);
      toast.success('Book added to favorites successfully');
    }
  };
  console.log(favorites);
  return (
    <div className='relative flex gap-4 rounded-xl border p-5'>
      <Button
        variant='ghost'
        size='icon'
        className='absolute top-3 right-3 size-8 rounded-full'
        onClick={toggleFavorite}
      >
        <Heart
          className={cn(
            'size-4 transition-all duration-300',
            isFavorite ? 'fill-white opacity-100' : '',
          )}
        />
      </Button>

      <div className='relative h-48 w-32 flex-shrink-0'>
        {book.volumeInfo.imageLinks?.thumbnail ? (
          <div className='relative h-full w-full overflow-hidden rounded-lg shadow-md'>
            <Image
              src={book.volumeInfo.imageLinks.thumbnail}
              alt={book.volumeInfo.title}
              fill
              className='object-cover'
            />
          </div>
        ) : (
          <div className='flex h-full w-full items-center justify-center rounded-lg text-muted-foreground'>
            <div className='text-center text-xs font-medium'>
              Нет
              <br />
              обложки
            </div>
          </div>
        )}
      </div>

      <div className='flex min-w-0 flex-1 flex-col'>
        <div className='flex-1 space-y-3'>
          <h3 className='mb-1 line-clamp-2 pr-12 text-lg leading-tight font-bold text-foreground'>
            {book.volumeInfo.title}
          </h3>
          {book.volumeInfo.authors && (
            <div className='flex items-center gap-x-2'>
              <User className='size-3.5 text-muted-foreground' />
              <p className='line-clamp-1 text-sm font-medium text-muted-foreground'>
                {book.volumeInfo.authors.join(', ')}
              </p>
            </div>
          )}

          {book.volumeInfo.categories &&
            book.volumeInfo.categories.length > 0 && (
              <div className='flex flex-wrap gap-1.5'>
                {book.volumeInfo.categories.slice(0, 3).map((category) => (
                  <Badge
                    key={category}
                    variant='secondary'
                    className='bg-primary/10 text-xs font-medium text-primary transition-colors duration-200 hover:bg-primary/20'
                  >
                    <p className='max-w-32 overflow-hidden text-nowrap text-ellipsis'>
                      {category}
                    </p>
                  </Badge>
                ))}
                {book.volumeInfo.categories.length > 3 && (
                  <Badge
                    variant='outline'
                    className='border-primary/30 text-xs font-medium text-primary/70 transition-colors duration-200 hover:bg-primary/5'
                  >
                    +{book.volumeInfo.categories.length - 3}
                  </Badge>
                )}
              </div>
            )}

          {book.volumeInfo.description && (
            <p className='line-clamp-3 text-sm leading-relaxed text-muted-foreground'>
              {book.volumeInfo.description}
            </p>
          )}
        </div>
        <Button className='mt-4 w-full '>
          <Link href={book.volumeInfo.previewLink}>Подробнее</Link>
        </Button>
      </div>
    </div>
  );
};
export const BookCardSkeleton = () => {
  return <Skeleton className='relative h-48 w-32 flex-shrink-0'></Skeleton>;
};
export default BookCard;
