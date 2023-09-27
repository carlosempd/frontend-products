import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, map, switchMap } from 'rxjs';
import { Product } from 'src/app/core/interfaces/product.interface';
import { PaginatedResponse, Pagination } from 'src/app/core/interfaces/response.interface';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit, AfterViewInit {
  loadingData = false;
  products: Product[] = [];
  datasource: MatTableDataSource<Product>;
  displayedColumns: string[] = ['image', 'name', 'price', 'sku'];
  resultsLength = 0;
  search$: Observable<string>;
  products$: Observable<Product[]>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private productService: ProductService
  ) {}
  
  ngOnInit(): void {
    this.datasource = new MatTableDataSource<Product>(this.products);
    this.search$ = this.productService.searchText$;
    this.search$.pipe(
      switchMap(value => this.productService.getProducts(undefined, value)),
      map((response: PaginatedResponse) => {
        this.resultsLength = response.totalCount;
        return response.data
      })
    ).subscribe((res: Product[]) => {
      this.loadData(res);
    })
  }

  ngAfterViewInit(): void {
    this.paginator.page.pipe(
      map((pageEvent: PageEvent) => ({
        currentPage: pageEvent.pageIndex+1,
        totalPages: pageEvent.length,
        perPage: pageEvent.pageSize,
        totalCount: this.resultsLength
      })),
      switchMap((pagination: Pagination) => this.productService.getProducts(pagination)),
      map((response: PaginatedResponse) => {
        this.resultsLength = response.totalCount;
        return response.data
      })
    ).subscribe((res: Product[]) => {
      this.loadData(res);
    })
  }

  loadData(products: Product[]) {
    this.datasource = new MatTableDataSource<Product>(products);
  }
}