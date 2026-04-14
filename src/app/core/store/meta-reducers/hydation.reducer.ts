import { ActionReducer, INIT, UPDATE } from '@ngrx/store';
import { AppState } from '../../../app.state';

export function hydrationMetaReducer(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state, action) => {
    // At start, try loading the state from LocalStorage
    if (action.type === INIT || action.type === UPDATE) {
      const storageValue = localStorage.getItem('__app_state__');
      if (storageValue) {
        try {
          return JSON.parse(storageValue);
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
