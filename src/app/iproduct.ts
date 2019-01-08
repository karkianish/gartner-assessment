import { ICategory } from './icategory';

export interface IProduct {
  ProductId: number;
  Name: string;
  Description: string;
  url: string;
  categories: Array<ICategory>;
}
