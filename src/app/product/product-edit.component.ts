import { Component, OnInit } from '@angular/core';
import { Product, EditProductConfig, Category } from './product.model';
import { ProductService } from './product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './product-edit.component.html'
})
export class ProductEditComponent implements OnInit {
  private _id: number;

  config = new EditProductConfig();

  product: Product;
  allCategories: Array<Category>;

  successMsg = '';
  failureMsg = '';

  constructor(private http: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this._id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.http.getProduct(this._id)
      .subscribe(res => this.product = res);

    this.http.getCategories()
      .subscribe(res => { this.allCategories = res; });
  }

  onUpdateClicked(payload: Product): void {
    payload.ProductId = this._id;
    this.http.updateProduct(payload)
      .subscribe(res => this.successMsg = 'Yay! Updated!',
        err => this.failureMsg = 'Oops! Update failed. Sorry about that. Please try again later.'
      );
  }

  onBackClicked(): void {
    this.router.navigate(['products']);
  }
}
