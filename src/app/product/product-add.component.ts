import { Component, OnInit } from '@angular/core';
import { IEditorConfig, AddProductConfig as AddProductConfig, Product, Category } from './product.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-add.component.html'
})
export class ProductAddComponent implements OnInit {
  private _id: number;

  config = new AddProductConfig();

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

  onAddClicked(payload: Product): void {
    payload.ProductId = this._id;
    this.http.addProduct(payload)
      .subscribe(res => this.successMsg = this.config.rightBtnSuccessMsg,
        err => this.failureMsg = this.config.rightBtnFailureMsg
      );
  }

  onBackClicked(): void {
    this.router.navigate(['products']);
  }
}
