import { Component, OnInit, Input } from '@angular/core';
import { Product, ProductDetailsConfig } from './product.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
  private _id: number;

  config = new ProductDetailsConfig();

  product: Product;

  constructor(private http: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this._id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.http.getProduct(this._id)
      .subscribe(res => this.product = res);
  }

  onEditClicked(): void {
    this.router.navigate(['edit', this._id]);
  }

  onBackClicked(): void {
    this.router.navigate(['products']);
  }
}
