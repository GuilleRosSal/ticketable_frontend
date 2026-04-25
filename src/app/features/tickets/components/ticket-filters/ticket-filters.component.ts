import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { UserService } from '../../../../core/auth/services/user.service';
import { selectUserRole } from '../../../../core/auth/store/selectors/auth.selector';
import { showToast } from '../../../../core/toasts/store/actions/toast.actions';
import { FormUtils } from '../../../../shared/utils/form.utils';
import { obtainTicketsPerPage } from '../../../../shared/utils/window.utils';
import { TicketFilters, TicketState } from '../../models/ticket.model';
import { CategoryService } from '../../services/category.service';
import { filterTickets } from '../../store/actions/ticket.actions';

@Component({
  selector: 'app-ticket-filters',
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './ticket-filters.component.html',
  styleUrl: './ticket-filters.component.scss',
})
export class TicketFiltersComponent implements OnInit {
  @Output() onClose = new EventEmitter<void>();

  private store = inject(Store);
  private destroyRef = inject(DestroyRef);
  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  private userService = inject(UserService);

  categories$: Observable<string[]> = this.categoryService
    .getCategories()
    .pipe(map((response) => response.categories));

  private subcategoriesSubject = new BehaviorSubject<string[]>([]);
  subcategories$ = this.subcategoriesSubject.asObservable();

  clientEmails$: Observable<string[]> = this.userService
    .getClientEmails()
    .pipe(map((response) => response.emails));

  userRole$ = this.store.select(selectUserRole);

  filtersForm = this.fb.group({
    category: ['', [Validators.maxLength(FormUtils.DB_LIMITS.STANDARD)]],
    subcategory: ['', [Validators.maxLength(FormUtils.DB_LIMITS.STANDARD)]],
    state: ['', [Validators.maxLength(FormUtils.DB_LIMITS.SHORT)]],
    creation_date: [''],
    email: ['', [Validators.email, Validators.maxLength(FormUtils.DB_LIMITS.SHORT)]],
  });

  ngOnInit(): void {
    this.initialSubcategoryLoad();

    this.filtersForm
      .get('category')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((category) => this.updateSubcategoryValues(category));
  }

  hideFilters() {
    this.onClose.emit();
  }

  onSubmit() {
    if (this.filtersForm.valid) {
      const formValues = this.filtersForm.getRawValue();

      const filters: TicketFilters = {
        category: formValues.category || undefined,
        subcategory: formValues.subcategory || undefined,
        state: (formValues.state as TicketState) || undefined,
        creation_date: formValues.creation_date || undefined,
        email: formValues.email || undefined,
      };

      this.filterTickets(filters);

      this.hideFilters();
    } else {
      this.filtersForm.markAllAsTouched();
    }
  }

  initialSubcategoryLoad() {
    this.categoryService.getSubcategories().subscribe({
      next: (response) => this.subcategoriesSubject.next(response.subcategories),
      error: (error) => {
        this.subcategoriesSubject.next([]);
        this.showErrorMessage(error.error.error);
      },
    });
  }

  updateSubcategoryValues(category: string | null) {
    const control = this.filtersForm.get('subcategory');

    control?.setValue('');

    if (category) {
      this.categoryService.getSubcategoriesByCategory(category).subscribe({
        next: (response) => this.subcategoriesSubject.next(response.subcategories),
        error: (error) => {
          this.subcategoriesSubject.next([]);
          this.showErrorMessage(error.error.error);
        },
      });
    } else {
      this.initialSubcategoryLoad();
    }
  }

  private filterTickets(filters: TicketFilters) {
    const limit = obtainTicketsPerPage();

    this.store.dispatch(filterTickets({ filters, limit }));
  }

  resetFilters() {
    this.filtersForm.reset({
      category: '',
      subcategory: '',
      state: '',
      creation_date: '',
      email: '',
    });

    this.filterTickets({});

    this.hideFilters();
  }

  showErrorMessage(message: string) {
    this.store.dispatch(showToast({ message, toastType: 'error' }));
  }

  hasErrors(controlName: string, errorType: string) {
    return FormUtils.hasErrors(this.filtersForm, controlName, errorType);
  }

  hasAnyError(controlName: string) {
    return FormUtils.hasAnyError(this.filtersForm, controlName);
  }

  isFieldEmpty(controlName: string) {
    return FormUtils.isFieldEmpty(this.filtersForm, controlName);
  }
}
