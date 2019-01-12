export class Product {
  ProductId: number;
  Name: string;
  Description: string;
  Url: string;
  Categories: Array<Category>;
}

export class Category {
  constructor(public CategoryId: number,
    public Name: string) { }
}

export interface IEditorConfig {
  readonly: boolean;
  btnRightText: string;
  btnLeftText: string;
  rightBtnSuccessMsg: string;
  rightBtnFailureMsg: string;
}

export class AddProductConfig implements IEditorConfig {
  readonly = false;
  btnRightText = 'Add Product';
  btnLeftText = 'Back To Summary';
  rightBtnSuccessMsg: 'Yay! Product successfuly added.';
  rightBtnFailureMsg: 'Oh no! An error occurred. Sorry about this.';
}

export class EditProductConfig implements IEditorConfig {
  readonly = false;
  btnRightText = 'Update';
  btnLeftText = 'Back To Summary';
  rightBtnSuccessMsg: 'Sweet! Product successfuly updated.';
  rightBtnFailureMsg: 'Oh no! An error occurred. Sorry about this.';
}

export class ProductDetailsConfig implements IEditorConfig {
  readonly = true;
  btnRightText = 'Edit';
  btnLeftText = 'Back To Summary';
  rightBtnSuccessMsg: '';
  rightBtnFailureMsg: '';
}
