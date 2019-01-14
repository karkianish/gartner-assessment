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
      .subscribe(res => this.product = res,
        err => this.handleError(err));

    this.http.getCategories()
      .subscribe(res => this.allCategories = res,
        err => this.handleError(err));
  }

  handleError(err: any): void {
    // ak - 01-12-2019 - reset before providing a new value; to ensure change detection kicks in
    this.failureMsg = '';
    this.failureMsg = this.config.rightBtnFailureMsg;
  }

  onUpdateClicked(payload: Product): void {
    payload.ProductId = this._id;
    this.http.updateProduct(payload)
      .subscribe(res => this.successMsg = `Yay! - ${payload.Name} was successfully updated!`,
        err => this.handleError(err)
      );
  }

  onBackClicked(): void {
    this.router.navigate(['products']);
  }
}
