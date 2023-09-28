import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, debounceTime, distinctUntilChanged, map, startWith } from 'rxjs';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) {}
  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      name: ['']
    });

    this.productService.searchText$ = this.searchForm.valueChanges
      .pipe(
        // startWith(''),
        debounceTime(400),
        map(val => val.name),
        distinctUntilChanged()
      );
  }
}
