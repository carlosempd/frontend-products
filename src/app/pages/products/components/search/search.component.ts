import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, debounceTime, distinctUntilChanged, map, startWith } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  searchText$: Observable<string>;
  @Output() searchEmitter: EventEmitter<Observable<string>> = new EventEmitter<Observable<string>>;
 
  constructor(
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      name: ['']
    });

    this.searchText$ = this.searchForm.valueChanges
      .pipe(
        startWith(''),
        debounceTime(400),
        map(val => val.name),
        distinctUntilChanged()
      );

    this.searchEmitter.emit(this.searchText$);
  }
}
