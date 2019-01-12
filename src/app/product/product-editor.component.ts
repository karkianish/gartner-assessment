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
  @Input() hideMsgInMiliseconds = 3000;

  @ViewChild(TagsComponent)
  tagComponent: TagsComponent;

  @Input() config: IEditorConfig;
  @Output() rightButtonClicked = new EventEmitter<Product>();
  @Output() leftButtonClicked = new EventEmitter<Product>();

  allCategories: Array<Category> = [];
  categoryNames: Array<string>;

  rightBtnSuccessMsg = '';
  rightBtnFailureMsg = '';
  canDisplayRightBtnSuccessMsg = false;
  canDisplayRightBtnFailureMsg = false;

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
      this.canDisplayRightBtnSuccessMsg = true;
      setTimeout(() => {
        this.canDisplayRightBtnSuccessMsg = false;
      }, this.hideMsgInMiliseconds);

    } else {
      this.rightBtnSuccessMsg = '';
      this.canDisplayRightBtnSuccessMsg = false;
    }
  }

  @Input('rightButtonFailureMsg')
  set rightButtonFailureMsg(msg: string) {
    if (msg) {
      this.rightBtnFailureMsg = msg;
      this.canDisplayRightBtnFailureMsg = true;
      setTimeout(() => {
        this.canDisplayRightBtnFailureMsg = false;
      }, this.hideMsgInMiliseconds);

    } else {
      this.rightBtnFailureMsg = '';
      this.canDisplayRightBtnFailureMsg = false;
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
    product.Categories = this.allCategories.filter(
      category => this.tagComponent.tags && this.tagComponent.tags.includes(category.Name));

    return product;
  }
}
