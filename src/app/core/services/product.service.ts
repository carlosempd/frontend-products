import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '../interfaces/response.interface';
import { Product } from '../interfaces/product.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products$: Observable<Product[]>;

  constructor(
    private apiService: ApiService
  ) { }

  getProducts(): Observable<PaginatedResponse> {
    return this.apiService.get(
      `${ environment.apiUrl }/products`
    );
  }
}
