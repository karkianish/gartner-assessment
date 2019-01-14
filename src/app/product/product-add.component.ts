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
  clearInputFields = false;

  constructor(private http: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this._id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.http.getCategories().subscribe(res => this.allCategories = res);
  }

  onAddClicked(payload: Product): void {
    payload.ProductId = this._id;
    this.http.addProduct(payload)
      .subscribe(
        res => {
          // ak - 01-12-2018 - since the new value can be the same as the old value, change detection will not do it's magic
          // so to make sure change detection kicks in - reset the value before providing the new one.
          this.successMsg = '';
          this.clearInputFields = false;

          this.successMsg = `Nice! - ${payload.Name} was successfully added!`;
          this.clearInputFields = true;
        },
        err => {
          this.failureMsg = '';
          this.failureMsg = this.config.rightBtnFailureMsg;
        }
      );
  }

  onBackClicked(): void {
    this.router.navigate(['products']);
  }
}
