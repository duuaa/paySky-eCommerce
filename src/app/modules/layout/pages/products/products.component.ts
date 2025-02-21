import { Component } from '@angular/core';
import { ApiService } from 'src/app/modules/layout/services/api.service';
import { product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  products: product[] = [];
  showProductForm = false;
  selectedProduct: product | null = null;
  categories: string[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchProducts();
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.apiService.getCategories().subscribe((data: any) => {
      this.categories = data;
    });
  }
  fetchProducts(): void {
    this.apiService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }
  openAddProduct(): void {
    this.selectedProduct = null;
    this.showProductForm = true;
  }

  openEditProduct(product: any): void {
    this.selectedProduct = product;
    this.showProductForm = true;
  }

  closeProductForm(): void {
    this.showProductForm = false;
  }

  handleProductFormSubmit(formData: any): void {
    if (!formData) {
      this.closeProductForm();
      return;
    }
    if (this.selectedProduct) {
      // تحديث المنتج
      this.apiService.updateProduct(formData.id, formData).subscribe(() => {
        this.fetchProducts();
        this.closeProductForm();
      });
    } else {
      // إضافة منتج جديد
      this.apiService.addProduct(formData).subscribe(() => {
        this.fetchProducts();
        this.closeProductForm();
      });
    }
  }

  deleteProduct(productId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.apiService.deleteProduct(productId).subscribe(() => {
        this.fetchProducts();
      });
    }
  }
  filterByCategory(category: string): void {
    this.apiService.filterByCategory(category).subscribe((data) => {
      this.products = data;
    });
  }
}
