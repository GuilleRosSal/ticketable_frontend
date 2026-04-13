import { AsyncPipe, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectToastData } from '../../store/selectors/toast.selector';

@Component({
  selector: 'app-toast',
  imports: [NgClass, AsyncPipe],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {
  private store = inject(Store);

  toast$ = this.store.select(selectToastData);
}
