import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/core/interfaces/product.interface';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  loadingData = false;
  products: Product[] = [];
  datasource: MatTableDataSource<Product>;
  displayedColumns: string[] = ['image', 'name', 'price', 'sku'];
  resultsLength = 0;
  
  ngOnInit(): void {
    this.datasource = new MatTableDataSource<Product>(this.products);
  }
}
