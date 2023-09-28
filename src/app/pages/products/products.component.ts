import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateProductDialogComponent } from './components/create-product-dialog/create-product-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  constructor(
    public dialog: MatDialog,
  ) {}
  openCreateProductDialog() {
    this.dialog.open(CreateProductDialogComponent);
  }

}
