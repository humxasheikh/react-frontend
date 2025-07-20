import type { ADD_TODO, DELETED_TODO, TOGGLE_TODO } from './consts';

export type Action =
  | { type: ADD_TODO; payload: string }
  | { type: TOGGLE_TODO; payload: number }
  | { type: DELETED_TODO; payload: number };
