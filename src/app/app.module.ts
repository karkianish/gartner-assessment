import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { ProductDetailComponent } from './product/product-detail.component';
import { ProductEditComponent } from './product/product-edit.component';
import { ProductListComponent } from './product/product-list.component';
import { Routes, RouterModule } from '@angular/router';
import { TagsComponent } from './product/tags.component';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductListComponent },
  { path: 'details/:id', component: ProductDetailComponent },
  { path: 'edit/:id', component: ProductEditComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductListComponent,
    TagsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    NgbTypeaheadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
