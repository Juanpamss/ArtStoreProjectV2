import { createReducer, on } from '@ngrx/store';
import { setProducts } from './actions';

export const initialState = {
  products: []
};

const _counterReducer = createReducer(
  initialState,
  on(setProducts, (state, { fetchArtPieces }) => ({...state, products: fetchArtPieces}))
);

export function counterReducer(state, action) {
  return _counterReducer(state, action);
}
