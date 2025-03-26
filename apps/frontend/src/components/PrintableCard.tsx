import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Printable } from '@/types';

interface PrintableCardProps {
    printModel: Printable;
}

const PrintableCard = ({ printModel }: PrintableCardProps) => {
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <Card className='overflow-hidden group'>
            <Link to={`/printModel/${printModel.id}`}>
                <div className='relative aspect-square overflow-hidden'>
                    <img
                        src={printModel.imageUrl || '/placeholder.svg'}
                        alt={printModel.title}
                        className='object-cover transition-transform group-hover:scale-105'
                    />
                    {/* {printModel.featured && <Badge className='absolute top-2 left-2 z-10'>Featured</Badge>} */}
                    {printModel.price === 0 && (
                        <Badge variant='secondary' className='absolute top-2 right-2 z-10'>
                            Free
                        </Badge>
                    )}
                </div>
            </Link>
            <CardContent className='p-4'>
                <div className='flex justify-between items-start gap-2'>
                    <Link to={`/printModel/${printModel.id}`} className='flex-1'>
                        <h3 className='font-medium line-clamp-2 hover:underline'>{printModel.title}</h3>
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
                    <Link to={`/creator/${printModel.creator.id}`} className='hover:underline'>
                        {printModel.creator.name}
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
                                        i < printModel.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300',
                                    )}
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 24 24'
                                >
                                    <path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
                                </svg>
                            ))}
                    </div>
                    {/* <span className='text-xs text-muted-foreground'>({printModel.reviews})</span> */}
                </div>
            </CardContent>
            <CardFooter className='p-4 pt-0 flex justify-between items-center'>
                <div className='font-medium'>
                    {printModel.price === 0 ? (
                        'Free'
                    ) : (
                        <>
                            ${printModel.price.toFixed(2)}
                            {/* {printModel.originalPrice && (
                                <span className='ml-2 text-sm text-muted-foreground line-through'>
                                    ${printModel.originalPrice.toFixed(2)}
                                </span>
                            )} */}
                        </>
                    )}
                </div>
                <Button size='sm' className='gap-1'>
                    <Download className='h-4 w-4' />
                    {printModel.price === 0 ? 'Download' : 'Buy'}
                </Button>
            </CardFooter>
        </Card>
    );
};

export default PrintableCard;
