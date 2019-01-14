import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, map, merge } from 'rxjs/operators';

@Component({
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  productListForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private service: ProductService) { }

  allProducts: Product[] = [];
  filteredProducts = [];
  searchPlaceholderText = '';

  ngOnInit() {
    this.productListForm = this.formBuilder.group({
      'search': ''
    });

    this.productListForm
      .get('search')
      .valueChanges
      .pipe(debounceTime(200))
      .subscribe((data: string) => {
        this.filteredProducts = this.allProducts.filter(
          product => product.Name.toLowerCase().indexOf(data.toLowerCase()) > -1);
      });

      this.searchPlaceholderText = 'loading products... almost there!';
    this.service.getProducts()
      .subscribe(res => this.onProductLoaded(res),
        err => this.handleError(err));
  }

  handleError(err: any): void {
    throw new Error('Method not implemented.');
  }

  onProductLoaded(products: Product[]): void {
    this.allProducts = products.sort((p1, p2) => p1.Name.localeCompare(p2.Name));
    this.filteredProducts = this.allProducts;
    this.searchPlaceholderText = '(type product name to search)';
  }

  onDetailsClicked(id: number): void {
    this.router.navigate(['details', id]);
  }

  onEditClicked(id: number): void {
    this.router.navigate(['edit', id]);
  }

  onAddClicked(): void {
    this.router.navigate(['add']);
  }
}
