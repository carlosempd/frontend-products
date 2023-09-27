import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  search$: Observable<string>;

  loadSearch($event: Observable<string>) {
    this.search$ = $event;
    this.search$.subscribe(res => {
      console.log('SC', res);
      
    })
  }

}
