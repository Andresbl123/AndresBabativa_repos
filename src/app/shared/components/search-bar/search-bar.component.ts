import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  imports: [ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.sass',
})
export class SearchBarComponent implements OnInit {
  searchForm: FormGroup;

  @Output() searchTerm = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchInput: [''],
    });
  }

  ngOnInit(): void {
    this.setupSearch();
  }

  private setupSearch(): void {
    this.searchForm
      .get('searchInput')
      ?.valueChanges.pipe(
        debounceTime(400), // Espera 400ms después de cada tecla
        distinctUntilChanged() // Solo emite si el valor cambió
      )
      .subscribe((term: string) => {
        this.searchTerm.emit(term.trim().toLowerCase());
      });
  }

  clearSearch(): void {
    this.searchForm.get('searchInput')?.setValue('');
  }
}
