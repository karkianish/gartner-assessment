import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { GenericValidator } from './generic-validator';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  private readonly _id: number;

  productEditForm: FormGroup;
  product: Product;

  validator: GenericValidator;
  allValidationMessages = {
    'name': {
      'required': 'Product name is required.',
      'maxlength': `Cannot be more than ${this._maxLengthName} characters.`
    },
    'description': {
      'maxlength': `Cannot be more than ${this._maxLengthDescription} characters.`
    },
    'url': {
      'maxlength': `Cannot be more than ${this._maxLengthUrl} characters.`
    }
  };

  formErrors: { [controlName: string]: string } = {};

  private readonly _maxLengthName = 50;
  private readonly _maxLengthDescription = 200;
  private readonly _maxLengthUrl = 500;

  constructor(private formBuilder: FormBuilder,
    private http: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this._id = this.activatedRoute.snapshot.params['id'];
    this.validator = new GenericValidator(this.allValidationMessages);
  }

  ngOnInit() {
    this.productEditForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(this._maxLengthName)]],
      description: ['', Validators.maxLength(this._maxLengthDescription)],
      url: ['', Validators.maxLength(this._maxLengthUrl)],
      categories: ['']
    });

    this.productEditForm.valueChanges.pipe(debounceTime(200)).subscribe(data => this.onFormChanged(data));

      this.http.getProduct(this._id).subscribe(
        res => this.onProductReceived(res),
        err => this.handleError(err)
      );
  }

  onFormChanged(data: any): void {
    console.log(data);
  }

  onProductReceived(product: Product): void {
    this.product = product;
  }

  handleError(err: any): void {
  }


  }
  