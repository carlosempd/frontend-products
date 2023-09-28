import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/core/interfaces/product.interface';
import { ProductService } from 'src/app/core/services/product.service';
import { UtilService } from 'src/app/core/services/util.service';

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
    private FormBuilder: FormBuilder,
    private utilService: UtilService
  ) {}
  ngOnInit(): void {
    this.productForm = this.FormBuilder.group({
      name : [this.data?.product?.name],
      description: [this.data?.product?.description],
      price: [this.data?.product?.price, [ Validators.required, Validators.pattern(/^\d+(\.\d+)?$/) ]],
      sku: [this.data?.product?.sku],
      stock: [this.data?.product?.stock, [ Validators.required, Validators.pattern("^[0-9]*$") ]],
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
        this.utilService.showSnackbar(
          'Product updated succesfully'
        )
      }, err => {
        this.utilService.showSnackbar(
          'An error ocurred, please try again',
          'Ok',
          1500,
          'error'
        )
      })
    }
  }
}
