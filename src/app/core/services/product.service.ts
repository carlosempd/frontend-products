import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { PaginatedResponse, Pagination } from '../interfaces/response.interface';
import { Product } from '../interfaces/product.interface';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products$: Observable<Product[]>;
  public searchText$: Observable<string>;

  constructor(
    private apiService: ApiService
  ) { }

  getProducts(
    pagination?: Pagination,
    searchName?: string
  ): Observable<PaginatedResponse> {
    let params = new HttpParams();
    if (searchName) {
      params = params.append(
        'search',
        searchName
      )
    }
    if (pagination) {
      params = params.append('page', pagination.currentPage)
      params = params.append('limit', pagination.perPage || 10)
    }
    return this.apiService.get(
      `${ environment.apiUrl }/products`,
      params
    );
  }

  deleteProduct(id: string) {
    return this.apiService.softDelete(`${ environment.apiUrl }/products/${ id }`);
  }
}
