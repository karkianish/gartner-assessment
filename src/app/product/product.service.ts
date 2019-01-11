import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product, Category } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly _apiPath = `https://gdm-interview-api.azurewebsites.net/api/v1`;

  private readonly _headers = new HttpHeaders({
    // tslint:disable-next-line:max-line-length
    'authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiI0OCIsInVuaXF1ZV9uYW1lIjoiaW50ZXJ2aWV3YXBpQGdhcnRuZXIuY29tIiwiZW1haWwiOiJpbnRlcnZpZXdhcGlAZ2FydG5lci5jb20iLCJuYmYiOjE1MzgxNDgzMTMsImV4cCI6MTU5ODE0ODI1MywiaWF0IjoxNTM4MTQ4MzEzfQ.GcEipOXLPNLfYvQF36hM7mE2wjdAqSQfQW5Q4kqi9rg`
  });

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this._apiPath}/categories`, { headers: this._headers });
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this._apiPath}/products`, { headers: this._headers });
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this._apiPath}/products/${id}`, { headers: this._headers });
  }

  addProduct(payload: Product): Observable<Product> {
    return this.http.post<Product>(`${this._apiPath}/products`, { headers: this._headers });
  }

  updateProduct(payload: Product): Observable<Product> {
    return this.http.put<Product>(`${this._apiPath}/products/${payload.ProductId}`, { headers: this._headers });
  }
}
