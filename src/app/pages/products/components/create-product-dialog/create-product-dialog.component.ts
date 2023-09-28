import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-create-product-dialog',
  templateUrl: './create-product-dialog.component.html',
  styleUrls: ['./create-product-dialog.component.scss']
})
export class CreateProductDialogComponent {
  productForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateProductDialogComponent>,
    private productService: ProductService,
    private FormBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.productForm = this.FormBuilder.group({
      name : ['', Validators.required],
      description: [''],
      price: ['', Validators.required],
      sku: ['', Validators.required],
      stock: ['', Validators.required],
      image: [''],
      tags: ['']
    });
  }

  submit() {
    if (this.productForm.valid) {
      this.productService.create(this.productForm.value)
        .subscribe(res => {
          this.productService.fetchNewProducts();
          this.closeDialog();
        })
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
