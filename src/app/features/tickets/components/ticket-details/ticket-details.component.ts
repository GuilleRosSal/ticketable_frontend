import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import {
  AfterViewInit,
  Component,
  DestroyRef,
  inject,
  Input,
  numberAttribute,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import { BehaviorSubject, forkJoin, map, Observable, switchMap } from 'rxjs';
import { selectUserRole } from '../../../../core/auth/store/selectors/auth.selector';
import { showToast } from '../../../../core/toasts/store/actions/toast.actions';
import { Img, processImageArray$ } from '../../../../shared/utils/image.utils';
import { TicketDetails } from '../../models/ticket.model';
import { TicketService } from '../../services/ticket.service';
import { TicketResolutionComponent } from '../ticket-resolution/ticket-resolution.component';

interface TicketDetailsWithImages extends TicketDetails {
  processedClientImages: Img[];
  processedResolutionImages: Img[];
}

@Component({
  selector: 'app-ticket-details',
  imports: [AsyncPipe, NgClass, DatePipe, TicketResolutionComponent],
  templateUrl: './ticket-details.component.html',
  styleUrl: './ticket-details.component.scss',
})
export class TicketDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  private store = inject(Store);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private ticketService = inject(TicketService);

  @Input({ transform: numberAttribute }) id!: number;

  ticketDetails$!: Observable<TicketDetailsWithImages>;
  private reloadTicket$ = new BehaviorSubject<void>(undefined);

  private lightbox: PhotoSwipeLightbox | null = null;
  @ViewChildren('carouselItem') carouselItems!: QueryList<any>;

  userRole$ = this.store.select(selectUserRole);

  ngOnInit(): void {
    if (isNaN(this.id)) {
      this.router.navigateByUrl('/ticket');
      this.showErrorMessage('ID de ticket no válido');
    } else {
      this.ticketDetails$ = this.reloadTicket$.pipe(
        switchMap(() => this.ticketService.getTicketDetails(this.id)),
        map((response) => response.ticket),
        switchMap((ticket) => {
          const clientImgs$ = processImageArray$(ticket.clientimage);
          const resolutionImgs$ = processImageArray$(ticket.resolutionimage);

          return forkJoin({
            client: clientImgs$,
            resolution: resolutionImgs$,
          }).pipe(
            map(({ client, resolution }) => ({
              ...ticket,
              processedClientImages: client,
              processedResolutionImages: resolution,
            })),
          );
        }),
      );
    }
  }

  ngAfterViewInit(): void {
    this.carouselItems.changes
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((items: QueryList<any>) => {
        if (items.length > 0) {
          this.initLightbox();
        }
      });
  }

  ngOnDestroy(): void {
    this.lightbox?.destroy();
  }

  onTicketUpdate(): void {
    this.reloadTicket$.next();
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

  showErrorMessage(message: string) {
    this.store.dispatch(showToast({ message, toastType: 'error' }));
  }
}
