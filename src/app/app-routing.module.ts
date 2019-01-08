import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductSummaryComponent } from './product-summary/product-summary.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'product-details', component: ProductDetailComponent },
  { path: 'product-edit', component: ProductEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
