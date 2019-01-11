import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from './product.service';
import { Product } from './product.model';
import { GenericValidator } from '../generic-validator';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html'
})
export class ProductEditComponent implements OnInit {
  private readonly _id: number;
  private readonly _nameMaxLength = 50;
  private readonly _descriptionMaxLength = 200;
  private readonly _urlMaxLength = 500;

  productEditForm: FormGroup;
  product: Product;

  validator: GenericValidator;
  allValidationMessages = {
    'name': {
      'required': 'Product name is required.',
      'maxlength': `Cannot be more than ${this._nameMaxLength} characters.`
    },
    'description': {
      'maxlength': `Cannot be more than ${this._descriptionMaxLength} characters.`
    },
    'url': {
      'maxlength': `Cannot be more than ${this._urlMaxLength} characters.`
    }
  };

  formErrors: { [controlName: string]: string } = {};

  constructor(private formBuilder: FormBuilder,
    private http: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this._id = this.activatedRoute.snapshot.params['id'];
    this.validator = new GenericValidator(this.allValidationMessages);
  }

  ngOnInit() {
    this.productEditForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(this._nameMaxLength)]],
      description: ['', Validators.maxLength(this._descriptionMaxLength)],
      url: ['', Validators.maxLength(this._urlMaxLength)],
      categories: ['']
    });

    this.productEditForm.valueChanges
      .pipe(debounceTime(200))
      .subscribe(data => this.onFormChanged(data));

    this.http.getCategories().subscribe(x => console.log(x));

    this.http.getProduct(this._id).subscribe(
      res => this.onProductReceived(res),
      err => this.handleError(err)
    );
  }

  onFormChanged(data: any): void {
    this.formErrors = this.validator.validate(this.productEditForm);
  }

  onProductReceived(product: Product): void {
    this.product = product;
    this.productEditForm.patchValue({
      name: this.product.Name,
      description: this.product.Description,
      url: this.product.Url,
      categories: this.product.Categories.map(x => x.Name).join(', ')
    });
  }

  handleError(err: any): void {
  }

  onBackToSummaryClicked(): void {
    this.router.navigate(['products']);
  }

  onUpdateClicked(): void {
    const updatedProduct = this.getUpdatedProduct();
    this.productEditForm.disable();
  }

  getUpdatedProduct(): Product {
    const product = new Product();
    product.Name = this.productEditForm.get('name').value as string;
    product.Description = this.productEditForm.get('description').value as string;
    product.Url = this.productEditForm.get('url').value as string;
    // = this.productEditForm.get('').value as string;
    console.log(product);
    console.log(this.productEditForm.get('categories').value);
    return product;
  }
}
