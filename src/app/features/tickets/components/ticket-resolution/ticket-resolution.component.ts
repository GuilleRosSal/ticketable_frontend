import { AsyncPipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import { BehaviorSubject, forkJoin, map } from 'rxjs';
import { showToast } from '../../../../core/toasts/store/actions/toast.actions';
import { FormUtils } from '../../../../shared/utils/form.utils';
import { getImageDimensions$, ImgFile } from '../../../../shared/utils/image.utils';
import { TicketResolutionData, TicketState } from '../../models/ticket.model';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket-resolution',
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './ticket-resolution.component.html',
  styleUrl: './ticket-resolution.component.scss',
})
export class TicketResolutionComponent implements OnInit, AfterViewInit, OnDestroy {
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);
  private fb = inject(FormBuilder);
  private ticketService = inject(TicketService);

  @Input({ required: true }) ticket_id!: number;

  @Output() updated = new EventEmitter<void>();

  private lightbox: PhotoSwipeLightbox | null = null;
  private selectedImagesSubject = new BehaviorSubject<ImgFile[]>([]);
  selectedImages$ = this.selectedImagesSubject.asObservable();
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChildren('carouselItem') carouselItem!: QueryList<any>;

  resolutionForm = this.fb.nonNullable.group({
    state: ['IN_PROGRESS', [Validators.required, Validators.maxLength(FormUtils.DB_LIMITS.SHORT)]],
    resolution: ['', [Validators.maxLength(FormUtils.DB_LIMITS.LONG)]],
    images: [[] as File[], [Validators.maxLength(FormUtils.DB_LIMITS.MAX_IMAGES)]],
  });

  ngOnInit(): void {
    this.resolutionForm
      .get('state')
      ?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((state) => {
        const control = this.resolutionForm.get('resolution');

        if (state === 'IN_PROGRESS') {
          control?.removeValidators([Validators.required]);
        } else {
          // state === 'RESOLVED'
          control?.addValidators([Validators.required]);
        }
        control?.updateValueAndValidity();
      });
  }

  ngAfterViewInit(): void {
    this.carouselItem.changes
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.initLightbox());
  }

  ngOnDestroy(): void {
    this.lightbox?.destroy();
  }

  onSubmit() {
    if (this.resolutionForm.valid) {
      const rawData = this.resolutionForm.getRawValue();

      const data: TicketResolutionData =
        rawData.state === 'IN_PROGRESS'
          ? { state: TicketState.IN_PROGRESS }
          : {
              state: TicketState.RESOLVED,
              resolution: rawData.resolution,
              images: rawData.images,
            };

      this.resolveTicket(data);
    } else {
      this.resolutionForm.markAllAsTouched();
    }
  }

  private resolveTicket(data: TicketResolutionData) {
    this.ticketService.resolveTicket(this.ticket_id, data).subscribe({
      next: (response) => {
        const message =
          response.ticket.state === 'IN_PROGRESS'
            ? 'Se ha actualizado el estado de la incidencia correctamente'
            : 'La incidencia se ha resuelto correctamente';

        this.store.dispatch(
          showToast({
            message,
            toastType: 'success',
          }),
        );

        this.updated.emit();
      },
      error: (error) => this.showErrorMessage(error.error.error),
    });
  }

  initLightbox() {
    if (this.lightbox) {
      this.lightbox.destroy();
    }

    this.lightbox = new PhotoSwipeLightbox({
      gallery: '#form__carousel',
      children: '.carousel__preview-item',
      pswpModule: () => import('photoswipe'),
    });
    this.lightbox.init();
  }

  onFileChange(event: Event) {
    const element = event.target as HTMLInputElement;
    const fileList = element.files;

    if (fileList && fileList.length > 0) {
      const filesArray = Array.from(fileList);

      const imageRequests$ = filesArray.map((file) =>
        getImageDimensions$(file).pipe(
          map((dimensions) => ({
            file,
            url: URL.createObjectURL(file),
            width: dimensions.width,
            height: dimensions.height,
          })),
        ),
      );

      forkJoin(imageRequests$).subscribe((newImages) => {
        this.selectedImagesSubject.next(newImages);

        const control = this.resolutionForm.get('images');
        control?.setValue(newImages.map((img) => img.file));
        control?.markAsTouched();
        control?.updateValueAndValidity();

        if (this.fileInput) {
          this.fileInput.nativeElement.value = '';
        }
      });
    }
  }

  removeFile(index: number) {
    const currentImages = this.selectedImagesSubject.value;
    const imageToRemove = currentImages[index];

    URL.revokeObjectURL(imageToRemove.url);

    const updatedImages = currentImages.filter((_, i) => i !== index);

    this.selectedImagesSubject.next(updatedImages);
    const control = this.resolutionForm.get('images');
    control?.setValue(updatedImages.map((img) => img.file));
    control?.updateValueAndValidity();
  }

  showErrorMessage(message: string) {
    this.store.dispatch(showToast({ message, toastType: 'error' }));
  }

  hasErrors(controlName: string, errorType: string) {
    return FormUtils.hasErrors(this.resolutionForm, controlName, errorType);
  }

  hasAnyError(controlName: string) {
    return FormUtils.hasAnyError(this.resolutionForm, controlName);
  }

  isFieldEmpty(controlName: string) {
    return FormUtils.isFieldEmpty(this.resolutionForm, controlName);
  }
}
