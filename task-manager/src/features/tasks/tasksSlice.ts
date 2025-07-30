import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type Task } from '../../types/task';

const initialState: Task[] = [
  {
    id: '1',
    title: 'Design login page',
    description: 'Include Figma styles',
    status: 'todo',
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Design login page',
    description: 'Include Figma styles',
    status: 'todo',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Set up backend',
    description: 'Connect to MongoDB',
    status: 'in-progress',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Write unit tests',
    status: 'done',
    createdAt: new Date().toISOString(),
  },
];

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      state.push(action.payload);
    },
  },
});

export const { addTask } = tasksSlice.actions;
export default tasksSlice.reducer;
