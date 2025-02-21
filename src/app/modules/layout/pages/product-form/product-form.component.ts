import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { product } from '../../models/product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent implements OnInit {
  @Input() product: product | null = null; // إذا كانت موجودة يعني وضع التعديل
  @Output() formSubmit = new EventEmitter<any>();
  @Input() categories: string[] = [];
  productForm!: FormGroup;
  isEditMode = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.isEditMode = !!this.product;
    this.productForm = this.fb.group({
      title: [this.product ? this.product.title : '', Validators.required],
      price: [
        this.product ? this.product.price : '',
        [Validators.required, Validators.min(0)],
      ],
      description: [
        this.product ? this.product.description : '',
        Validators.required,
      ],
      category: [
        this.product ? this.product.category : '',
        Validators.required,
      ],
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const formValue = this.productForm.value;
      // في وضع التعديل، نضيف الـ id لتحديث المنتج
      if (this.isEditMode) {
        formValue.id = this.product?.id;
      }
      this.formSubmit.emit(formValue);
    }
  }
  cancel(): void {
    this.productForm.reset();
    this.formSubmit.emit(null);
  }
}
