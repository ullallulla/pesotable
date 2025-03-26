import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Download, Heart, Share2, ShoppingCart, Star } from 'lucide-react';
import PrintableCard from '@/components/PrintableCard';
// import { printables } from '../../../backend/data/prints';
import { Printable } from '@/types';
import modelService from '../services/models'
import { useQuery } from '@tanstack/react-query';

const PrintablePage = () => {
    const { id } = useParams();

    const { isPending, isError, data: printModels, error } = useQuery<Printable[]>({
        queryKey: ['printModels'],
        queryFn: modelService.getAll
    })
    if (isPending) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <p className='text-lg'>Loading model...</p>
            </div>
        );
    }

    if (isError) {
        return <div>Error: {error.message}</div>
    }
    const printModel = printModels.find((p) => p.id === Number(id));

    if (!printModel) {
        return (
            <div className='flex flex-col items-center justify-center h-screen text-center'>
                <h1 className='text-4xl font-bold'>404 - Page Not Found</h1>
                <p className='text-lg mt-2'>The page you're looking for doesn't exist.</p>
                <Link to='/' className='mt-4 text-blue-500 underline'>
                    Go Back Home
                </Link>
            </div>
        );
    }

    // Get related printModels (same category, excluding current)
    // const relatedprintModels = printModels
    //     .filter((p) => p.category === printModel?.category && p.id !== printModel.id)
    //     .slice(0, 4);

    return (
        <div className='container py-6 md:py-10 max-w-7xl mx-auto'>
            <div className='grid md:grid-cols-2 gap-8'>
                <div className='space-y-4'>
                    <div className='relative aspect-square overflow-hidden rounded-lg border'>
                        <img
                            src={printModel?.imageUrl || '/placeholder.svg'}
                            alt={printModel?.title}
                            className='object-contain'
                        />
                        {/* {printModel?.featured && <Badge className='absolute top-4 left-4 z-10'>Featured</Badge>} */}
                        {printModel?.price === 0 && (
                            <Badge variant='secondary' className='absolute top-4 right-4 z-10'>
                                Free
                            </Badge>
                        )}
                    </div>
                    <div className='grid grid-cols-4 gap-2'>
                        {[...Array(4)].map((_, i) => (
                            <div
                                key={i}
                                className='relative aspect-square overflow-hidden rounded-md border cursor-pointer hover:opacity-80'
                            >
                                <img
                                    src={printModel?.imageUrl || '/placeholder.svg'}
                                    alt={`${printModel?.title} thumbnail ${i + 1}`}
                                    className='object-cover'
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className='space-y-6'>
                    <div>
                        <h1 className='text-3xl font-bold'>{printModel?.title}</h1>
                        {/* <div className='flex items-center gap-2 mt-2'>
                            <Link to={`/creator/${printModel?.creator.id}`} className='text-primary hover:underline'>
                                {printModel?.creator.name}
                            </Link>
                        </div> */}
                        <div className='flex items-center gap-2 mt-2'>
                            <div className='flex'>
                                {Array(5)
                                    .fill(0)
                                    .map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-5 w-5 ${
                                                i < Math.floor(printModel?.rating ?? 0)
                                                    ? 'text-yellow-400 fill-yellow-400'
                                                    : i < (printModel?.rating ?? 0)
                                                      ? 'text-yellow-400 fill-yellow-400'
                                                      : 'text-gray-300'
                                            }`}
                                        />
                                    ))}
                            </div>
                            {/* <span className='text-sm text-muted-foreground'>
                                {printModel?.rating.toFixed(1)} ({printModel?.reviews} reviews)
                            </span> */}
                            <span className='text-sm text-muted-foreground'>•</span>
                            <span className='text-sm text-muted-foreground'>{printModel?.downloads} downloads</span>
                        </div>
                    </div>

                    <div className='flex items-center gap-2'>
                        <div className='text-3xl font-bold'>
                            {printModel?.price === 0 ? (
                                'Free'
                            ) : (
                                <>
                                    ${printModel?.price.toFixed(2)}
                                    {/* {printModel?.originalPrice && (
                                        <span className='ml-2 text-xl text-muted-foreground line-through'>
                                            ${printModel.originalPrice.toFixed(2)}
                                        </span>
                                    )} */}
                                </>
                            )}
                        </div>
                        {/* {printModel?.originalPrice && (
                            <Badge variant='outline' className='text-green-600'>
                                {Math.round(
                                    ((printModel.originalPrice - printModel.price) / printModel.originalPrice) * 100,
                                )}
                                % OFF
                            </Badge>
                        )} */}
                    </div>

                    <p className='text-muted-foreground'>{printModel?.description}</p>

                    <div className='space-y-2'>
                        <div className='flex justify-between text-sm'>
                            <span className='text-muted-foreground'>Category:</span>
                            {/* <span className='font-medium capitalize'>{printModel?.category.replace('-', ' ')}</span> */}
                        </div>
                        <div className='flex justify-between text-sm'>
                            <span className='text-muted-foreground'>File Format:</span>
                            <span className='font-medium'>PDF, PNG, SVG</span>
                        </div>
                        <div className='flex justify-between text-sm'>
                            <span className='text-muted-foreground'>Date Added:</span>
                            <span className='font-medium'>
                                {new Date(printModel?.createdAt ?? '').toLocaleDateString()}
                            </span>
                        </div>
                        <div className='flex justify-between text-sm'>
                            <span className='text-muted-foreground'>License:</span>
                            <span className='font-medium'>Personal Use</span>
                        </div>
                    </div>

                    {printModel?.price !== 0 && (
                        <div className='flex items-center gap-2'>
                            <div className='text-lg font-semibold'>Printed Model Price:</div>
                            <div className='text-2xl font-bold'>${((printModel?.price ?? 0) * 3).toFixed(2)}</div>
                            <Badge variant='outline' className='text-green-600'>
                                Includes Shipping
                            </Badge>
                        </div>
                    )}

                    <div className='space-y-3'>
                        <div className='flex flex-col sm:flex-row gap-3'>
                            {printModel?.price === 0 ? (
                                <Button size='lg' className='gap-2 flex-1'>
                                    <Download className='h-5 w-5' />
                                    Download Now
                                </Button>
                            ) : (
                                <>
                                    <Button size='lg' className='gap-2 flex-1'>
                                        <Download className='h-5 w-5' />
                                        Buy Digital Model
                                    </Button>
                                    <Button size='lg' variant='secondary' className='gap-2 flex-1'>
                                        <ShoppingCart className='h-5 w-5' />
                                        Order Printed Model
                                    </Button>
                                </>
                            )}
                        </div>
                        <div className='flex gap-3'>
                            <Button variant='outline' size='lg' className='gap-2 flex-1'>
                                <Heart className='h-5 w-5' />
                                Add to Favorites
                            </Button>
                            <Button variant='ghost' size='icon'>
                                <Share2 className='h-5 w-5' />
                                <span className='sr-only'>Share</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <Tabs defaultValue='details' className='mt-10'>
                <TabsList className='w-full sm:w-auto grid grid-cols-3 sm:flex'>
                    <TabsTrigger value='details'>Details</TabsTrigger>
                    {/* <TabsTrigger value='reviews'>Reviews ({printModel?.reviews})</TabsTrigger> */}
                    <TabsTrigger value='license'>License</TabsTrigger>
                </TabsList>
                <TabsContent value='details' className='mt-6 space-y-4'>
                    <h2 className='text-xl font-bold'>Product Details</h2>
                    <p>
                        {printModel?.description} This premium printModel is designed to help you{' '}
                        {/* {printModel?.category === 'planners'
                            ? 'stay organized and productive'
                            : printModel?.category === 'wall-art'
                              ? 'decorate your space with beautiful designs'
                              : printModel?.category === '3d-models'
                                ? 'create amazing 3D printed objects'
                                : 'enhance your learning experience'} */}
                        .
                    </p>

                    <h3 className='text-lg font-semibold mt-4'>What's Included</h3>
                    <ul className='list-disc pl-5 space-y-1'>
                        <li>High-resolution PDF files ready for printing</li>
                        <li>PNG files with transparent backgrounds</li>
                        <li>SVG vector files for scaling without quality loss</li>
                        <li>Detailed instructions for printing and usage</li>
                        {/* {printModel?.category === 'planners' && (
                            <>
                                <li>Multiple color variations</li>
                                <li>Both dated and undated versions</li>
                            </>
                        )}
                        {printModel?.category === '3d-models' && (
                            <>
                                <li>STL files optimized for 3D printing</li>
                                <li>Recommended print settings</li>
                            </>
                        )} */}
                    </ul>

                    <h3 className='text-lg font-semibold mt-4'>Specifications</h3>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        <div className='space-y-2'>
                            <div className='flex justify-between text-sm border-b pb-1'>
                                <span className='text-muted-foreground'>File Format:</span>
                                <span className='font-medium'>PDF, PNG, SVG</span>
                            </div>
                            <div className='flex justify-between text-sm border-b pb-1'>
                                <span className='text-muted-foreground'>Resolution:</span>
                                <span className='font-medium'>300 DPI</span>
                            </div>
                            <div className='flex justify-between text-sm border-b pb-1'>
                                <span className='text-muted-foreground'>Dimensions:</span>
                                <span className='font-medium'>8.5" x 11" (Letter)</span>
                            </div>
                        </div>
                        <div className='space-y-2'>
                            <div className='flex justify-between text-sm border-b pb-1'>
                                <span className='text-muted-foreground'>Color Mode:</span>
                                <span className='font-medium'>RGB</span>
                            </div>
                            <div className='flex justify-between text-sm border-b pb-1'>
                                <span className='text-muted-foreground'>File Size:</span>
                                <span className='font-medium'>15 MB</span>
                            </div>
                            <div className='flex justify-between text-sm border-b pb-1'>
                                <span className='text-muted-foreground'>Software Compatibility:</span>
                                <span className='font-medium'>Any PDF Reader</span>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value='reviews' className='mt-6 space-y-6'>
                    <div className='flex items-center gap-4'>
                        <div className='text-center'>
                            <div className='text-5xl font-bold'>{printModel?.rating.toFixed(1)}</div>
                            <div className='flex justify-center mt-1'>
                                {Array(5)
                                    .fill(0)
                                    .map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-5 w-5 ${
                                                i < Math.floor(printModel?.rating ?? 0)
                                                    ? 'text-yellow-400 fill-yellow-400'
                                                    : i < (printModel?.rating ?? 0)
                                                      ? 'text-yellow-400 fill-yellow-400'
                                                      : 'text-gray-300'
                                            }`}
                                        />
                                    ))}
                            </div>
                            {/* <div className='text-sm text-muted-foreground mt-1'>
                                Based on {printModel?.reviews} reviews
                            </div> */}
                        </div>

                        <div className='flex-1 space-y-1'>
                            {[5, 4, 3, 2, 1].map((star) => {
                                const percentage =
                                    star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 7 : star === 2 ? 2 : 1;
                                return (
                                    <div key={star} className='flex items-center gap-2'>
                                        <div className='flex items-center gap-1 w-16'>
                                            <span>{star}</span>
                                            <Star className='h-4 w-4 text-yellow-400 fill-yellow-400' />
                                        </div>
                                        <div className='flex-1 h-2 bg-muted rounded-full overflow-hidden'>
                                            <div className='h-full bg-yellow-400' style={{ width: `${percentage}%` }} />
                                        </div>
                                        <div className='w-12 text-sm text-right text-muted-foreground'>
                                            {percentage}%
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <Separator />

                    {/* Mock reviews */}
                    <div className='space-y-6'>
                        {[
                            {
                                name: 'Sarah Johnson',
                                date: '2 weeks ago',
                                rating: 5,
                                comment:
                                    'Absolutely love this printModel! The quality is excellent and it was exactly what I needed. Highly recommend!',
                            },
                            {
                                name: 'Michael Chen',
                                date: '1 month ago',
                                rating: 4,
                                comment:
                                    'Great design and easy to print. Would have given 5 stars but I wish there were more color options.',
                            },
                            {
                                name: 'Jessica Williams',
                                date: '2 months ago',
                                rating: 5,
                                comment:
                                    'This is my third purchase from this creator and they never disappoint. The files are always well-organized and the designs are beautiful.',
                            },
                        ].map((review, index) => (
                            <div key={index} className='space-y-2'>
                                <div className='flex justify-between items-start'>
                                    <div>
                                        <div className='font-medium'>{review.name}</div>
                                        <div className='flex items-center gap-1'>
                                            {Array(5)
                                                .fill(0)
                                                .map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`h-4 w-4 ${
                                                            i < review.rating
                                                                ? 'text-yellow-400 fill-yellow-400'
                                                                : 'text-gray-300'
                                                        }`}
                                                    />
                                                ))}
                                        </div>
                                    </div>
                                    <div className='text-sm text-muted-foreground'>{review.date}</div>
                                </div>
                                <p className='text-muted-foreground'>{review.comment}</p>
                                {index < 2 && <Separator />}
                            </div>
                        ))}
                    </div>

                    <Button variant='outline' className='w-full'>
                        Load More Reviews
                    </Button>
                </TabsContent>

                <TabsContent value='license' className='mt-6 space-y-4'>
                    <h2 className='text-xl font-bold'>License Information</h2>
                    <div className='space-y-4'>
                        <p>
                            This printModel is licensed for personal use only. When you purchase this item, you are
                            granted a non-exclusive, non-transferable license to use the digital files for your own
                            personal, non-commercial purposes.
                        </p>

                        <h3 className='text-lg font-semibold'>You May:</h3>
                        <ul className='list-disc pl-5 space-y-1'>
                            <li>Print the files for your personal use</li>
                            <li>Use the printModels in your home, office, or personal space</li>
                            <li>Make modifications for your personal use</li>
                        </ul>

                        <h3 className='text-lg font-semibold'>You May Not:</h3>
                        <ul className='list-disc pl-5 space-y-1'>
                            <li>Share, redistribute, or sell the digital files</li>
                            <li>Use the printModels for commercial purposes</li>
                            <li>Create derivative products for sale</li>
                            <li>Print and sell the physical printed items</li>
                            <li>Claim the designs as your own</li>
                        </ul>

                        <p className='text-sm text-muted-foreground mt-4'>
                            For commercial use or extended licenses, please contact the creator directly.
                        </p>
                    </div>
                </TabsContent>
            </Tabs>

            <div className='mt-16'>
                <h2 className='text-2xl font-bold mb-6'>Related Print Models</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {printModels.map((printModel) => (
                        <PrintableCard key={printModel.id} printModel={printModel} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PrintablePage;
