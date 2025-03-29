import { useForm } from '@tanstack/react-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import type { CheckedState } from '@radix-ui/react-checkbox';
import { useAuth } from '@clerk/clerk-react';
import UploadDropZone from './UploadDropZone';
import { useUser } from '@clerk/clerk-react';
import { PrintModelFormValues } from '@/types';
import printModelService from '../services/models';

const ModelUploadForm = () => {
    const { user } = useUser();

    const form = useForm({
        defaultValues: {
            title: '',
            description: '',
            imageUrl: '',
            fileUrl: '',
            price: 0,
            isPublished: false,
            userId: '',
            featured: false,
        } as PrintModelFormValues,
        onSubmit: async ({ value }) => {
            if (!user || !user.id) {
                throw new Error('Unauthorized');
            }
            const dataToSubmit = {
                ...value,
                userId: user.id,
            };
            console.log(dataToSubmit);
            try {
                await printModelService.createPrintModel(dataToSubmit);
            } catch (error) {
                console.error(error);
            }
        },
    });

    const { getToken } = useAuth();

    const handleUpload = async () => {
        const token = await getToken();
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        return headers;
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
            }}
            className='space-y-8'
        >
            <div className='grid gap-6 md:grid-cols-2'>
                <div className='space-y-6'>
                    <form.Field name='title'>
                        {(field) => (
                            <>
                                <Label htmlFor='title'>Title</Label>
                                <Input
                                    id='title'
                                    name={field.name}
                                    value={field.state.value}
                                    type='text'
                                    onChange={(e) => field.handleChange(e.target.value)}
                                />
                            </>
                        )}
                    </form.Field>
                    <form.Field name='description'>
                        {(field) => (
                            <>
                                <Label htmlFor='description'>Description</Label>
                                <Textarea
                                    id='description'
                                    name={field.name}
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                />
                            </>
                        )}
                    </form.Field>
                    <form.Field name='price'>
                        {(field) => (
                            <>
                                <Label htmlFor='price'>Price</Label>
                                <Input
                                    id='price'
                                    name={field.name}
                                    value={field.state.value}
                                    type='number'
                                    onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                                />
                            </>
                        )}
                    </form.Field>
                    <form.Field name='featured'>
                        {(field) => (
                            <>
                                <Label htmlFor='featured'>Featured</Label>
                                <Checkbox
                                    id='featured'
                                    name={field.name}
                                    checked={field.state.value}
                                    onCheckedChange={(checked: CheckedState) => {
                                        if (typeof checked === 'boolean') {
                                            field.handleChange(checked);
                                        }
                                    }}
                                />
                            </>
                        )}
                    </form.Field>
                    <form.Field name='isPublished'>
                        {(field) => (
                            <>
                                <Label htmlFor='isPublished'>Published</Label>
                                <Checkbox
                                    id='isPublished'
                                    name={field.name}
                                    checked={field.state.value}
                                    onCheckedChange={(checked: CheckedState) => {
                                        if (typeof checked === 'boolean') {
                                            field.handleChange(checked);
                                        }
                                    }}
                                />
                            </>
                        )}
                    </form.Field>
                </div>
                <div className='space-y-6'>
                    <form.Field name='imageUrl'>
                        {(field) => (
                            <>
                                <Label htmlFor='imageUrl'>Image</Label>
                                {field.state.value ? (
                                    <div className='mt-2 space-y-2'>
                                        <p className='text-sm'>Current Image:</p>
                                        <img
                                            src={field.state.value}
                                            alt='Profile preview'
                                            width={100}
                                            height={100}
                                            className='rounded border object-cover'
                                        />
                                        <Button
                                            type='button'
                                            variant='outline'
                                            size='sm'
                                            onClick={() => field.handleChange('')} // Clear the field value
                                        >
                                            Remove Image
                                        </Button>
                                    </div>
                                ) : (
                                    <div className='mt-1'>
                                        <UploadDropZone
                                            endpoint='modelUploader'
                                            headers={handleUpload}
                                            onClientUploadComplete={(file) => {
                                                const uploadedUrl = file[0].ufsUrl;
                                                console.log('Upload successful! URL:', uploadedUrl);
                                                field.handleChange(uploadedUrl);
                                                console.log('uploaded', file);
                                            }}
                                            onUploadError={(error: Error) => {
                                                console.error('Upload Error:', error);
                                                alert(`ERROR! ${error.message}`);
                                            }}
                                        />
                                    </div>
                                )}
                            </>
                        )}
                    </form.Field>
                    <form.Field name='fileUrl'>
                        {(field) => (
                            <>
                                <Label htmlFor='fileUrl'>3D Model</Label>
                                {field.state.value ? (
                                    <div className='mt-2 space-y-2'>
                                        <p className='text-sm'>Current 3D Model:</p>
                                        <img
                                            src={field.state.value}
                                            alt='Profile preview'
                                            width={100}
                                            height={100}
                                            className='rounded border object-cover'
                                        />
                                        <Button
                                            type='button'
                                            variant='outline'
                                            size='sm'
                                            onClick={() => field.handleChange('')}
                                        >
                                            Remove 3D Model
                                        </Button>
                                    </div>
                                ) : (
                                    <div className='mt-1'>
                                        <UploadDropZone
                                            endpoint='modelUploader'
                                            headers={handleUpload}
                                            onClientUploadComplete={(file) => {
                                                const uploadedUrl = file[0].ufsUrl;
                                                console.log('Upload successful! URL:', uploadedUrl);
                                                field.handleChange(uploadedUrl);
                                                console.log('uploaded', file);
                                            }}
                                            onUploadError={(error: Error) => {
                                                console.error('Upload Error:', error);
                                                alert(`ERROR! ${error.message}`);
                                            }}
                                        />
                                    </div>
                                )}
                            </>
                        )}
                    </form.Field>
                </div>
            </div>
            <div className='flex justify-end gap-4'>
                <Button type='button' variant='outline'>
                    Save as Draft
                </Button>
                <Button type='submit'>Publish Model</Button>
            </div>
        </form>
    );
};

export default ModelUploadForm;
