import { Component, OnInit } from '@angular/core';
import { ProductService } from './product/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'gartner-assessment';

  constructor(private service: ProductService) {
  }

  ngOnInit(): void {
    this.service.getCategories()
      .subscribe(res => this.service.setCategories(res));
    // ak -01-12-2018 - dont do anything about the error here
    // because we will try to retrieve this at a later time if it fails.
  }
}
