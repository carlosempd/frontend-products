import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ToolbarModule } from 'src/app/shared/components/toolbar/toolbar.module';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailDialogComponent } from './components/product-detail-dialog/product-detail-dialog.component';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    ProductsComponent,
    SearchComponent,
    ProductsListComponent,
    ProductDetailDialogComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule
  ]
})
export class ProductsModule { }
