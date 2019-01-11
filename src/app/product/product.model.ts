export class Product {
  ProductId: number;
  // Name: string;
  // Description: string;
  // Url: string;
  // Categories: Array<Category>;

  constructor(public Name: string,
    public Description?: string,
    public Url?: string,
    public Categories: Array<Category> = []) {}

  //  categoryNames(): string {
    // console.log('cat', this.Categories)
    // const a = this.Categories
    //   .map(category => category.Name);
    //   console.log(a);
    //   const b = a.join(', ');
    //   console.log(b);
    //   return b;
  //   return 'cat names';
  // }
  // CategoryNames: string = (() => this.Categories.map(x=>x.Name).join(', '));
}

export class Category {
  constructor(public CategoryId: number = null,
    public Name: string = null) { }
}
