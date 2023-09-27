import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ToolbarModule } from 'src/app/shared/components/toolbar/toolbar.module';
import { SearchComponent } from './components/search/search.component';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    ProductsComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class ProductsModule { }
