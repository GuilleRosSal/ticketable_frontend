import { ActionReducer, INIT, UPDATE } from '@ngrx/store';
import { AppState } from '../../../app.state';

export function hydrationMetaReducer(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state, action) => {
    // At start, try loading the state from LocalStorage
    if (action.type === INIT || action.type === UPDATE) {
      const storageValue = localStorage.getItem('__app_state__');
      if (storageValue) {
        try {
          const persistedState = JSON.parse(storageValue);
          const token = persistedState.auth?.token;

          // Validate token persistance and its expiration state
          if (token && isTokenExpired(token)) {
            localStorage.removeItem('__app_state__');
            return reducer(undefined, action);
          }

          return persistedState;
        } catch {
          localStorage.removeItem('__app_state__');
        }
      }
    }

    // Let execute the corresponding reducer
    const nextState = reducer(state, action);

    // Store changes in LocalStorage
    if (nextState !== undefined && nextState !== null) {
      const stateToPersist: Partial<AppState> = {
        auth: nextState.auth,
      };

      localStorage.setItem('__app_state__', JSON.stringify(stateToPersist));
    }

    return nextState;
  };
}

function decodeBase64Url(base64Url: string): string {
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');

  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function isTokenExpired(jwt: string): boolean {
  try {
    const jwtParts = jwt.split('.');
    if (jwtParts.length !== 3) {
      return true;
    }

    const payloadJson = JSON.parse(decodeBase64Url(jwtParts[1]));

    if (!payloadJson.exp) {
      return false;
    }

    return Date.now() >= payloadJson.exp * 1000;
  } catch {
    return true;
  }
}
