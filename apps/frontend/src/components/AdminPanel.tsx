import { Link, Navigate, Outlet } from 'react-router-dom';
import { BookOpen, LayoutDashboard, Package, Settings, ShoppingCart, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/clerk-react';

const AdminPanel = () => {
    const { user, isLoaded } = useUser();

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    const isAdmin = user?.publicMetadata?.role === 'admin';

    if (!isAdmin) {
        return <Navigate to='/' replace />;
    }

    return (
        <div className='flex min-h-screen flex-col'>
            <header className='sticky top-0 z-50 w-full border-b bg-background'>
                <div className='container flex h-16 items-center justify-between'>
                    <div className='flex items-center gap-6'>
                        <Link to='/' className='flex items-center gap-2 font-bold text-xl'>
                            <BookOpen className='h-6 w-6' />
                            <span>Pesotable</span>
                        </Link>
                        <span className='text-sm font-medium text-muted-foreground'>Admin Dashboard</span>
                    </div>
                    <div className='flex items-center gap-4'>
                        <Button variant='outline' asChild>
                            <Link to='/'>View Site</Link>
                        </Button>
                    </div>
                </div>
            </header>
            <div className='flex flex-1'>
                <aside className='hidden w-64 border-r bg-muted/40 md:block'>
                    <div className='flex h-full flex-col gap-2 p-4'>
                        <div className='py-2'>
                            <h2 className='px-4 text-lg font-semibold tracking-tight'>Dashboard</h2>
                        </div>
                        <div className='flex-1 space-y-1'>
                            <Button variant='ghost' asChild className='w-full justify-start'>
                                <Link to='/admin' className='flex items-center gap-2'>
                                    <LayoutDashboard className='h-4 w-4' />
                                    Overview
                                </Link>
                            </Button>
                            <Button variant='ghost' asChild className='w-full justify-start'>
                                <Link to='/admin/models' className='flex items-center gap-2'>
                                    <Package className='h-4 w-4' />
                                    Models
                                </Link>
                            </Button>
                            <Button variant='ghost' asChild className='w-full justify-start'>
                                <Link to='/admin/orders' className='flex items-center gap-2'>
                                    <ShoppingCart className='h-4 w-4' />
                                    Orders
                                </Link>
                            </Button>
                            <Button variant='ghost' asChild className='w-full justify-start'>
                                <Link to='/admin/users' className='flex items-center gap-2'>
                                    <Users className='h-4 w-4' />
                                    Users
                                </Link>
                            </Button>
                            <Button variant='ghost' asChild className='w-full justify-start'>
                                <Link to='/admin/settings' className='flex items-center gap-2'>
                                    <Settings className='h-4 w-4' />
                                    Settings
                                </Link>
                            </Button>
                        </div>
                    </div>
                </aside>
                <main className='flex-1 overflow-auto p-6'>
                    < Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminPanel;
