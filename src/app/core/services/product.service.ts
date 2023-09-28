import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { PaginatedResponse, Pagination } from '../interfaces/response.interface';
import { Product } from '../interfaces/product.interface';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _productData$ = new BehaviorSubject<void>(undefined);
  private productsRequest$: Observable<PaginatedResponse> = this.getProducts();
  
  products$: Observable<Product[]>;
  public searchText$: Observable<string>;
  public productFetch$ = this._productData$.pipe(
    switchMap(() => this.productsRequest$)
  )

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

  fetchNewProducts(
    pagination?: Pagination,
    searchName?: string
  ) {
    this.productsRequest$ = this.getProducts(pagination, searchName);
    this._productData$.next();
  }

  deleteProduct(id: string) {
    return this.apiService.softDelete(`${ environment.apiUrl }/products/${ id }`);
  }
}
