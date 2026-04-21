import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { appReducers } from './app.state';
import { AuthEffects } from './core/auth/store/effects/auth.effects';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { tokenErrorInterceptor } from './core/interceptors/token-error.interceptor';
import { hydrationMetaReducer } from './core/store/meta-reducers/hydation.reducer';
import { ToastEffects } from './core/toasts/store/effects/toast.effects';
import { TicketEffects } from './features/tickets/store/effects/ticket.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),

    provideHttpClient(withInterceptors([authInterceptor, tokenErrorInterceptor])),

    provideStore(appReducers, { metaReducers: [hydrationMetaReducer] }),
    provideEffects([AuthEffects, ToastEffects, TicketEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
