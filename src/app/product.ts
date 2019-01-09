import { Category } from './category';

export class Product {
  ProductId: number;
  Name: string;
  Description: string;
  Url: string;
  Categories: Array<Category>;
}
