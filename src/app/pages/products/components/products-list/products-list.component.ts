import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription, map, switchMap, tap } from 'rxjs';
import { Product } from 'src/app/core/interfaces/product.interface';
import { PaginatedResponse, Pagination } from 'src/app/core/interfaces/response.interface';
import { ProductService } from 'src/app/core/services/product.service';
import { ProductDetailDialogComponent } from '../product-detail-dialog/product-detail-dialog.component';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit, AfterViewInit, OnDestroy {
  loadingData = true;
  products: Product[] = [];
  datasource: MatTableDataSource<Product>;
  displayedColumns: string[] = ['image', 'name', 'price', 'sku', 'action'];
  resultsLength = 0;
  search$: Observable<string>;
  products$: Observable<Product[]>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  productsFetch$: Observable<PaginatedResponse> = this.productService.productFetch$;
  subscription: Subscription = new Subscription();

  constructor(
    private productService: ProductService,
    public dialog: MatDialog,
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  ngOnInit(): void {
    this.datasource = new MatTableDataSource<Product>(this.products);
    this.search$ = this.productService.searchText$;

    // Data stream when input search is updated
    this.subscription.add(
      this.search$.pipe(
        tap(() => { this.loadingData = true }),
        switchMap(value => this.productService.getProducts(undefined, value)),
        map((response: PaginatedResponse) => {
          this.resultsLength = response.totalCount;
          this.loadingData = false;
          return response.data
        })
      ).subscribe((res: Product[]) => {
        this.loadData(res);
      })
    );

    // Data stream to load data normally
    this.subscription.add(
      this.productsFetch$
        .subscribe((res: PaginatedResponse) => {
          this.loadingData = false;
          this.resultsLength = res.totalCount;
          this.loadData(res.data);
        })
    )
  }

  ngAfterViewInit(): void {
    this.subscription.add(
      this.paginator.page
        .pipe(
          tap(() => this.loadingData = true)
        )
        .subscribe((pageEvent: PageEvent) => {
          const paginationObject: Pagination = {
            currentPage: pageEvent.pageIndex+1,
            totalPages: pageEvent.length,
            perPage: pageEvent.pageSize,
            totalCount: this.resultsLength
          }
          this.productService.fetchNewProducts(paginationObject);
        })
    )
  }

  loadData(products: Product[]) {
    this.datasource = new MatTableDataSource<Product>(products);
  }

  delete(elementId: string) {
    this.loadingData = true;
    this.productService.deleteProduct(elementId)
      .subscribe(res => {
        this.loadingData = false;
        this.productService.fetchNewProducts();
      })
  }

  openDetail(product: Product, edit = false) {
    const dialogRef = this.dialog.open(ProductDetailDialogComponent,{
      data: {
        product,
        edit
      },
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadingData = true;
      this.productService.fetchNewProducts();
    })
  }
}
