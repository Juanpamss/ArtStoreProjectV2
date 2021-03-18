import { createAction } from '@ngrx/store';
import {props} from "@ngrx/store";

export const setProducts = createAction('setInitialProducts', props<{ fetchArtPieces: object[] }>());
