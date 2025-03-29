export interface Creator {
    id: string;
    name: string;
    avatar: string;
}

export interface Printable {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    fileUrl: string;
    price: number;
    rating: number;
    downloads: number;
    isPublished: boolean;
    userId: string;
    createdAt: string;
    updatedAt: string;
    featured: boolean
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    count: number;
}

export interface PrintModelFormValues {
    title: string;
    description: string;
    imageUrl: string;
    fileUrl: string;
    price: number;
    isPublished: boolean;
    userId: string;
    featured: boolean;
}