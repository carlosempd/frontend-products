import { Product } from "./product.interface";

export interface PaginatedResponse extends Pagination {
    data: Product[];
}

export interface Pagination {
    totalCount: number;
    totalPages: number;
    currentPage: number;
    perPage: number
}