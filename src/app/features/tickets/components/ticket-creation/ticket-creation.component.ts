import { AsyncPipe } from '@angular/common';
import { Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import { BehaviorSubject, forkJoin, map, Observable, take } from 'rxjs';
import { showToast } from '../../../../core/toasts/store/actions/toast.actions';
import { FormUtils } from '../../../../shared/utils/form.utils';
import { getImageDimensions$, ImgFile } from '../../../../shared/utils/image.utils';
import { TicketCreationData } from '../../models/ticket.model';
import { CategoryService } from '../../services/category.service';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket-creation',
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './ticket-creation.component.html',
  styleUrl: './ticket-creation.component.scss',
})
export class TicketCreationComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private ticketService = inject(TicketService);
  private categoryService = inject(CategoryService);

  private lightbox: PhotoSwipeLightbox | null = null;
  private selectedImagesSubject = new BehaviorSubject<ImgFile[]>([]);
  selectedImages$ = this.selectedImagesSubject.asObservable();
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  categories$: Observable<string[]> = this.categoryService
    .getCategories()
    .pipe(map((response) => response.categories));

  private subcategoriesSubject = new BehaviorSubject<string[]>([]);
  subcategories$ = this.subcategoriesSubject.asObservable();

  openTicketForm = this.fb.nonNullable.group({
    category: ['', [Validators.required, Validators.maxLength(FormUtils.DB_LIMITS.STANDARD)]],
    subcategory: [
      { value: '', disabled: true },
      [Validators.required, Validators.maxLength(FormUtils.DB_LIMITS.STANDARD)],
    ],
    subject: ['', [Validators.required, Validators.maxLength(FormUtils.DB_LIMITS.STANDARD)]],
    description: ['', [Validators.required, Validators.maxLength(FormUtils.DB_LIMITS.LONG)]],
    images: [[] as File[], [Validators.maxLength(FormUtils.DB_LIMITS.MAX_IMAGES)]],
  });

  ngOnInit(): void {
    this.lightbox = new PhotoSwipeLightbox({
      gallery: '#form__carousel',
      children: '.carousel__preview-item',
      pswpModule: () => import('photoswipe'),
    });
    this.lightbox.init();

    this.openTicketForm.get('category')?.valueChanges.subscribe((categoryName) => {
      const control = this.openTicketForm.get('subcategory');

      control?.setValue('');

      if (categoryName) {
        this.categoryService.getSubcategoriesByCategory(categoryName).subscribe({
          next: (response) => {
            this.subcategoriesSubject.next(response.subcategories);
            if (response.subcategories.length > 0) {
              control?.enable();
            } else {
              control?.disable();
            }
          },
          error: (error) => {
            this.subcategoriesSubject.next([]);
            control?.disable();
            this.showErrorMessage(error.error.error);
          },
        });
      } else {
        this.subcategoriesSubject.next([]);
        control?.disable();
      }
    });
  }

  ngOnDestroy(): void {
    this.lightbox?.destroy();
  }

  onSubmit() {
    if (this.openTicketForm.valid) {
      const ticketData: TicketCreationData = this.openTicketForm.getRawValue();
      this.openTicket(ticketData);
    } else {
      this.openTicketForm.markAllAsTouched();
    }
  }

  private openTicket(ticketData: TicketCreationData) {
    this.ticketService
      .openTicket(ticketData)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/ticket');
        },
        error: (error) => this.showErrorMessage(error.error.error),
      });
  }

  onFileChange(event: Event) {
    const element = event.target as HTMLInputElement;
    const fileList = element.files;

    if (fileList && fileList.length > 0) {
      const filesArray = Array.from(fileList);

      const imageRequests$ = filesArray.map((file) =>
        getImageDimensions$(file).pipe(
          map((dims) => ({
            file,
            url: URL.createObjectURL(file),
            width: dims.width,
            height: dims.height,
          })),
        ),
      );

      forkJoin(imageRequests$).subscribe((newImages) => {
        this.selectedImagesSubject.next(newImages);

        const control = this.openTicketForm.get('images');
        control?.setValue(newImages.map((img) => img.file));
        control?.markAsTouched();
        control?.updateValueAndValidity();

        if (this.fileInput) {
          this.fileInput.nativeElement.value = '';
        }

        setTimeout(() => {
          this.lightbox?.destroy();
          this.lightbox?.init();
        }, 100);
      });
    }
  }

  removeFile(index: number) {
    const currentImages = this.selectedImagesSubject.value;
    const imageToRemove = currentImages[index];

    URL.revokeObjectURL(imageToRemove.url);

    const updatedImages = currentImages.filter((_, i) => i !== index);

    this.selectedImagesSubject.next(updatedImages);
    const control = this.openTicketForm.get('images');
    control?.setValue(updatedImages.map((img) => img.file));
    control?.updateValueAndValidity();

    setTimeout(() => {
      this.lightbox?.destroy();
      this.lightbox?.init();
    }, 100);
  }

  showErrorMessage(message: string) {
    this.store.dispatch(showToast({ message, toastType: 'error' }));
  }

  hasErrors(controlName: string, errorType: string) {
    return FormUtils.hasErrors(this.openTicketForm, controlName, errorType);
  }

  hasAnyError(controlName: string) {
    return FormUtils.hasAnyError(this.openTicketForm, controlName);
  }

  isSelectEmpty(controlName: string) {
    return FormUtils.isSelectEmpty(this.openTicketForm, controlName);
  }
}
