import { Component, OnInit, Input } from '@angular/core';
import { Product } from './product.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {

  private readonly _id: number;
  product: Product;
  categoryNames = '';

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: ProductService) {
    this._id = this.activatedRoute.snapshot.params['id'] as number;
  }

  ngOnInit() {
    this.http.getProduct(this._id)
      .subscribe(res => this.onProductReceived(res),
        err => this.handleError(err));
  }

  onProductReceived(product: Product): void {
    this.product = product;
    this.categoryNames = this.product.Categories
      .map(category => category.Name)
      .join(', ');
  }

  onBackClicked(): void {
    this.router.navigate(['products']);
  }

  onEditClicked(): void {
    this.router.navigate(['edit', this._id]);
  }

  handleError(err: any): void {
    // throw new Error('Method not implemented.');
  }

}
