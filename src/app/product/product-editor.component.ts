import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product, Category, IEditorConfig } from './product.model';
import { GenericValidator } from '../generic-validator';
import { debounceTime } from 'rxjs/operators';
import { TagsComponent } from './tags.component';

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html'
})
export class ProductEditorComponent implements OnInit {
  @Input() nameMaxLength = 50;
  @Input() descriptionMaxLength = 200;
  @Input() urlMaxLength = 500;
  @Input() hideSuccessMsgInMiliseconds = 3000;
  @Input() hideFailureMsgInMiliseconds = 7000;

  @ViewChild(TagsComponent)
  tagComponent: TagsComponent;

  @Input() config: IEditorConfig;
  @Output() rightButtonClicked = new EventEmitter<Product>();
  @Output() leftButtonClicked = new EventEmitter<Product>();

  allCategories: Array<Category> = [];
  categoryNames: Array<string>;

  rightBtnSuccessMsg = '';
  rightBtnFailureMsg = '';
  canDisplaySuccessMsg = false;
  canDisplayFailureMsg = false;

  productEditForm: FormGroup;
  validator: GenericValidator;
  allValidationMessages = {
    'name': {
      'required': 'Product name is required.',
      'maxlength': `Cannot be more than ${this.nameMaxLength} characters.`
    },
    'description': {
      'maxlength': `Cannot be more than ${this.descriptionMaxLength} characters.`
    },
    'url': {
      'maxlength': `Cannot be more than ${this.urlMaxLength} characters.`
    }
  };
  formErrors: { [controlName: string]: string } = {};

  onFormChanged(data: any): void {
    if (this.productEditForm.pristine && this.productEditForm.untouched) {
      // ak - means the form was reset. so clear any errors.
      this.formErrors = {};
    } else {
      this.formErrors = this.validator.validate(this.productEditForm);
    }
  }

  @Input('clearInputFields')
  set clearInputFields(clear: boolean) {
    if (clear) {
      this.productEditForm.reset();
      this.tagComponent.tags = [];
    }
  }

  @Input('product')
  set product(input: Product) {
    if (this.productEditForm) {
      this.productEditForm.patchValue({
        name: input.Name,
        description: input.Description,
        url: input.Url
      });
    }

    if (input && input.Categories) {
      this.tagComponent.tags = input.Categories.map(x => x.Name);
    }
  }

  @Input('allCategories')
  set categories(categories: Array<Category>) {
    if (categories) {
      this.allCategories = categories;
      this.categoryNames = categories.map(x => x.Name).sort((c1, c2) => c1.localeCompare(c2));
    }
  }

  @Input('rightButtonSuccessMsg')
  set rightButtonSuccessMsg(msg: string) {
    if (msg) {
      this.rightBtnSuccessMsg = msg;
      this.canDisplaySuccessMsg = true;
      setTimeout(() => {
        this.canDisplaySuccessMsg = false;
      }, this.hideSuccessMsgInMiliseconds);

    } else {
      this.rightBtnSuccessMsg = '';
      this.canDisplaySuccessMsg = false;
    }
  }

  @Input('rightButtonFailureMsg')
  set rightButtonFailureMsg(msg: string) {
    if (msg) {
      this.rightBtnFailureMsg = msg;
      this.canDisplayFailureMsg = true;
      setTimeout(() => {
        this.canDisplayFailureMsg = false;
      }, this.hideFailureMsgInMiliseconds);

    } else {
      this.rightBtnFailureMsg = '';
      this.canDisplayFailureMsg = false;
    }
  }

  constructor(private formBuilder: FormBuilder) {
    this.validator = new GenericValidator(this.allValidationMessages);
  }

  ngOnInit() {
    this.productEditForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(this.nameMaxLength)]],
      description: ['', Validators.maxLength(this.descriptionMaxLength)],
      url: ['', Validators.maxLength(this.urlMaxLength)],
      categories: ['']
    });

    this.productEditForm.valueChanges
      .pipe(debounceTime(200))
      .subscribe(data => this.onFormChanged(data));
  }

  onLeftButtonClicked(): void {
    this.leftButtonClicked.emit();
  }

  onRightButtonClicked(): void {
    this.formErrors = this.validator.validate(this.productEditForm);
    if (this.productEditForm.valid) {
      this.rightButtonClicked.emit(this.getUpdatedProduct());
    }
  }

  getUpdatedProduct(): Product {
    const product = new Product();
    product.Name = this.productEditForm.get('name').value as string;
    product.Description = this.productEditForm.get('description').value as string;
    product.Url = this.productEditForm.get('url').value as string;
    product.CategoryIds = this.allCategories
      .filter(category => this.tagComponent.tags && this.tagComponent.tags.includes(category.Name))
      .map(c => c.CategoryId);
    return product;
  }
}
