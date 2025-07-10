import { Loader } from 'lucide-react';

const loading = () => {
  return (
    <div className='flex h-dvh w-full items-center'>
      <Loader className='mx-auto h-12 w-12 animate-spin text-muted-foreground' />
    </div>
  );
};

export default loading;
