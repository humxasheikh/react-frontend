import type { Action } from '../types/action';
import type { Todo } from '../types/todo';

export const initialState: Todo[] = [
  { id: 1, text: 'Learning React', completed: false },
  { id: 2, text: 'Build a Todo App', completed: true },
];

export const todoReducer = (state: Todo[], action: Action): Todo[] => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        { id: Date.now(), text: action.payload, completed: false },
      ];
    case 'TOGGLE_TODO':
      return state.map((s) =>
        s.id !== action.payload ? s : { ...s, completed: !s.completed }
      );
    case 'DELETED_TODO':
      return state.filter((s) => s.id !== action.payload);
    default:
      return initialState;
  }
};
