import { Link } from 'react-router-dom';
import { BookOpen, ChevronDown, User, Search, ShoppingCart, Heart } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { categories } from '../../../backend/data/prints';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import TokenDebugger from './TokenDebugger';

const Header = () => {
    return (
        <header className='sticky top-0 z-50 w-full border-b bg-background'>
            <div className='container max-w-7xl mx-auto flex h-16 items-center justify-between'>
                <TokenDebugger/>
                <div className='flex items-center gap-6'>
                    <Link to='/' className='flex items-center gap-2 font-bold text-xl'>
                        <BookOpen className='h-6 w-6' />
                        <span>Pesotable</span>
                    </Link>
                    <nav className='hidden md:flex items-center gap-6'>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant='ghost' className='h-10 px-4'>
                                    Categories
                                    <ChevronDown className='ml-2 h-4 w-4' />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='start' className='w-48'>
                                {categories.map((category) => (
                                    <DropdownMenuItem key={category.id}>
                                        <Link to={`/category/${category.slug}`} className='w-full'>
                                            {category.name}
                                        </Link>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button variant='ghost' asChild className='h-10 px-4'>
                            <Link to='/new'>New Arrivals</Link>
                        </Button>
                        <Button variant='ghost' asChild className='h-10 px-4'>
                            <Link to='/popular'>Popular</Link>
                        </Button>
                        <Button variant='ghost' asChild className='h-10 px-4'>
                            <Link to='/free'>Free Printables</Link>
                        </Button>
                    </nav>
                </div>
                <div className='flex items-center gap-4'>
                    <div className='relative hidden md:block'>
                        <Search className='absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                        <Input
                            type='search'
                            placeholder='Search printables...'
                            className='w-[200px] lg:w-[300px] pl-8'
                        />
                    </div>
                    <div className='flex items-center'>
                        <Button variant='ghost' size='icon' className='h-10 w-10'>
                            <Heart className='h-5 w-5' />
                            <span className='sr-only'>Favorites</span>
                        </Button>
                        <Button variant='ghost' size='icon' className='h-10 w-10'>
                            <ShoppingCart className='h-5 w-5' />
                            <span className='sr-only'>Cart</span>
                        </Button>
                        <Button variant='ghost' size='icon' className='h-10 w-10 rounded-full'>
                            <User className='h-5 w-5' />
                            <span className='sr-only'>Account</span>
                        </Button>
                        <SignedOut>
                            <SignInButton />
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                        <Button variant='ghost' asChild className='h-10 px-4'>
                            <Link to='/model'>Model Viewer</Link>
                        </Button>
                        <Button variant='ghost' asChild className='h-10 px-4'>
                            <Link to='/upload'>Upload</Link>
                        </Button>
                        <Button variant='ghost' asChild className='h-10 px-4'>
                            <Link to='/admin'>Admin</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
