import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product.model';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private service: ProductService) { }

  products: Product[] = [];

  ngOnInit() {
    this.service.getProducts()
      .subscribe(res => this.onProductLoaded(res),
        err => this.handleError(err));
  }

  handleError(err: any): void {
    throw new Error('Method not implemented.');
  }

  onProductLoaded(products: Product[]): void {
    this.products = products.sort((p1, p2) => p1.Name.localeCompare(p2.Name));
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
