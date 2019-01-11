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
