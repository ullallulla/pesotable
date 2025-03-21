import { Button } from '@/components/ui/button';
import FeaturedPrintables from './FeaturedPrintables';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PrintableCard from './PrintableCard';
import { featuredPrintables, printables } from '../../../backend/data/prints';

const HomePage = () => {
    return (
        <main className='flex-1'>
            <section className='py-6 md:py-10 bg-muted/50'>
                <div className='container max-w-7xl mx-auto'>
                    <FeaturedPrintables printables={featuredPrintables} />
                </div>
            </section>
            <section className='py-8 container max-w-7xl mx-auto'>
                <div className='flex flex-col gap-4 '>
                    <div className='flex items-center justify-between'>
                        <h2 className='text-2xl font-bold tracking-tight'>Browse Printables</h2>
                        <div className='flex items-center gap-2'>
                            <Button variant='outline' size='sm' className='hidden md:flex'>
                                Filter
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant='outline' size='sm'>
                                        Sort by: Popular
                                        <ChevronDown className='ml-2 h-4 w-4' />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align='end'>
                                    <DropdownMenuItem>Popular</DropdownMenuItem>
                                    <DropdownMenuItem>Newest</DropdownMenuItem>
                                    <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
                                    <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <Tabs defaultValue='all' className='w-full'>
                        <TabsList className='mb-4'>
                            <TabsTrigger value='all'>All</TabsTrigger>
                            <TabsTrigger value='3d'>3D Models</TabsTrigger>
                            <TabsTrigger value='planners'>Planners</TabsTrigger>
                            <TabsTrigger value='art'>Wall Art</TabsTrigger>
                            <TabsTrigger value='educational'>Educational</TabsTrigger>
                        </TabsList>
                        <TabsContent value='all' className='mt-0'>
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                                {printables.map((printable) => (
                                    <PrintableCard key={printable.id} printable={printable} />
                                ))}
                            </div>
                        </TabsContent>
                        <TabsContent value='3d' className='mt-0'>
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                                {printables
                                    .filter((p) => p.category === '3d-models')
                                    .map((printable) => (
                                        <PrintableCard key={printable.id} printable={printable} />
                                    ))}
                            </div>
                        </TabsContent>
                        <TabsContent value='planners' className='mt-0'>
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                                {printables
                                    .filter((p) => p.category === 'planners')
                                    .map((printable) => (
                                        <PrintableCard key={printable.id} printable={printable} />
                                    ))}
                            </div>
                        </TabsContent>
                        <TabsContent value='art' className='mt-0'>
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                                {printables
                                    .filter((p) => p.category === 'wall-art')
                                    .map((printable) => (
                                        <PrintableCard key={printable.id} printable={printable} />
                                    ))}
                            </div>
                        </TabsContent>
                        <TabsContent value='educational' className='mt-0'>
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                                {printables
                                    .filter((p) => p.category === 'educational')
                                    .map((printable) => (
                                        <PrintableCard key={printable.id} printable={printable} />
                                    ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                    <div className='flex justify-center mt-8'>
                        <Button variant='outline' className='gap-2'>
                            Load More
                            <ChevronDown className='h-4 w-4' />
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default HomePage;
