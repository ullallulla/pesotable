export interface Creator {
    id: string
    name: string
    avatar: string
  }
  
  export interface Printable {
    id: string
    title: string
    description: string
    image: string
    price: number
    originalPrice?: number
    category: string
    rating: number
    reviews: number
    downloads: number
    featured: boolean
    creator: Creator
    dateAdded: string
  }
  
  export interface Category {
    id: string
    name: string
    slug: string
    count: number
  }
  