export type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    itemsLeft: number;
}

export type CartItem = {
    product: Product;
    quantity: number;
}

export type GetProductsRequestParams = {
    searchQuery?: string;
    maxPrice?: string;
    minPrice?: string;
    isShowOnlyAvailable?: string;
    sortOrder?: string;
    itemsPerPage?: string;
    pageNumber?: string;
}

export type GetProductsResponseParams = {
    products: Product[];
    totalProductsCount: number;
    maxAvailablePrice: number;
}

export type User = {
    email: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    address?: string;
}
