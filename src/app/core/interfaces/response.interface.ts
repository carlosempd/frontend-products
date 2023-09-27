import { Product } from "./product.interface";

export interface PaginatedResponse {
    data: Product[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
    perPage: number
}