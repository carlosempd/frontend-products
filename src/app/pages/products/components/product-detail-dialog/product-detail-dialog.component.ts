import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/core/interfaces/product.interface';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-product-detail-dialog',
  templateUrl: './product-detail-dialog.component.html',
  styleUrls: ['./product-detail-dialog.component.scss']
})
export class ProductDetailDialogComponent implements OnInit {
  productForm: FormGroup;
  modified = false;

  constructor(
    public dialogRef: MatDialogRef<ProductDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: Product, edit: boolean },
    private productService: ProductService,
    private FormBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.productForm = this.FormBuilder.group({
      name : [this.data?.product?.name],
      description: [this.data?.product?.description],
      price: [this.data?.product?.price],
      sku: [this.data?.product?.sku],
      stock: [this.data?.product?.stock],
      image: [this.data?.product?.image],
      tags: [this.data?.product?.tags]
    });

    if (!this.data.edit) {
      this.productForm.disable();
    }


  }

  closeDialog() {
    this.dialogRef.close();
  }

  update() {
    if (this.productForm.dirty) {
      this.productService.updateProduct(
        this.data.product._id,
        this.productForm.value
      ).subscribe(res => {
        this.closeDialog()
      })
    }
  }
}
