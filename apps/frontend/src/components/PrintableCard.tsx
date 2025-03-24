import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Printable } from '@/types';

interface PrintableCardProps {
    printable: Printable;
}

const PrintableCard = ({ printable }: PrintableCardProps) => {
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <Card className='overflow-hidden group'>
            <Link to={`/printable/${printable.id}`}>
                <div className='relative aspect-square overflow-hidden'>
                    <img
                        src={printable.imageUrl || '/placeholder.svg'}
                        alt={printable.title}
                        className='object-cover transition-transform group-hover:scale-105'
                    />
                    {/* {printable.featured && <Badge className='absolute top-2 left-2 z-10'>Featured</Badge>} */}
                    {printable.price === 0 && (
                        <Badge variant='secondary' className='absolute top-2 right-2 z-10'>
                            Free
                        </Badge>
                    )}
                </div>
            </Link>
            <CardContent className='p-4'>
                <div className='flex justify-between items-start gap-2'>
                    <Link to={`/printable/${printable.id}`} className='flex-1'>
                        <h3 className='font-medium line-clamp-2 hover:underline'>{printable.title}</h3>
                    </Link>
                    <Button
                        variant='ghost'
                        size='icon'
                        className='h-8 w-8 shrink-0'
                        onClick={() => setIsFavorite(!isFavorite)}
                    >
                        <Heart className={cn('h-5 w-5', isFavorite ? 'fill-red-500 text-red-500' : '')} />
                        <span className='sr-only'>Add to favorites</span>
                    </Button>
                </div>
                {/* <div className='flex items-center gap-1 mt-1 text-sm text-muted-foreground'>
                    <Link to={`/creator/${printable.creator.id}`} className='hover:underline'>
                        {printable.creator.name}
                    </Link>
                </div> */}
                <div className='flex items-center gap-1 mt-2'>
                    <div className='flex'>
                        {Array(5)
                            .fill(0)
                            .map((_, i) => (
                                <svg
                                    key={i}
                                    className={cn(
                                        'h-4 w-4',
                                        i < printable.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300',
                                    )}
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 24 24'
                                >
                                    <path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
                                </svg>
                            ))}
                    </div>
                    {/* <span className='text-xs text-muted-foreground'>({printable.reviews})</span> */}
                </div>
            </CardContent>
            <CardFooter className='p-4 pt-0 flex justify-between items-center'>
                <div className='font-medium'>
                    {printable.price === 0 ? (
                        'Free'
                    ) : (
                        <>
                            ${printable.price.toFixed(2)}
                            {/* {printable.originalPrice && (
                                <span className='ml-2 text-sm text-muted-foreground line-through'>
                                    ${printable.originalPrice.toFixed(2)}
                                </span>
                            )} */}
                        </>
                    )}
                </div>
                <Button size='sm' className='gap-1'>
                    <Download className='h-4 w-4' />
                    {printable.price === 0 ? 'Download' : 'Buy'}
                </Button>
            </CardFooter>
        </Card>
    );
};

export default PrintableCard;
