export interface Creator {
    id: string;
    name: string;
    avatar: string;
}

export interface Printable {
    id: number;
    title: string;
    description: string;
    image: string;
    price: number;
    originalPrice?: number;
    category: string;
    rating: number;
    reviews: number;
    downloads: number;
    featured: boolean;
    creator: Creator;
    dateAdded: string;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    count: number;
}

export interface PrintModelData {
    id: string;
    title: string;
    description: string;
    price: number;
    isPublished: boolean;
    imageUrl: string;
    fileUrl: string;
    downloads: number;
    rating: number;
    featured: boolean;
    userId: string;
}

export type PrintModelDataWithoutId = Omit<PrintModelData, 'id'>
