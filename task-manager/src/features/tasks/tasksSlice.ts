import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { type Task } from '../../types/task';
import { fetchTasksAPI } from './tasksAPI';

// const initialState: Task[] = [
//   {
//     id: '1',
//     title: 'Design login page',
//     description: 'Include Figma styles',
//     status: 'todo',
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: '4',
//     title: 'Design login page',
//     description: 'Include Figma styles',
//     status: 'todo',
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: '2',
//     title: 'Set up backend',
//     description: 'Connect to MongoDB',
//     status: 'in-progress',
//     createdAt: new Date().toISOString(),
//   },
//   {
//     id: '3',
//     title: 'Write unit tests',
//     status: 'done',
//     createdAt: new Date().toISOString(),
//   },
// ];
interface tasksSlice {
  tasks: Task[];
  isLoading: boolean;
  isError: string | null;
}

const initialState: tasksSlice = {
  tasks: [],
  isLoading: false,
  isError: null,
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  return await fetchTasksAPI();
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // addTask(state, action: PayloadAction<Task>) {
    //   state.tasks.push(action.payload);
    // },
    // deleteTask(state, action: PayloadAction<string>) {
    //   return {
    //     tasks: state.tasks.filter((task) => task.id !== action.payload),
    //     isError: null,
    //     isLoading: false,
    //   };
    // },
    // updateTask(state, action: PayloadAction<Task>) {
    //   const index = state.tasks.findIndex(
    //     (task) => task.id == action.payload.id
    //   );
    //   if (index !== -1) state.tasks[index] = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.isLoading = true; //loading = true;
        state.isError = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || 'Error fetching tasks';
      });
  },
});

// export const { addTask, deleteTask, updateTask } = tasksSlice.actions;
export default tasksSlice.reducer;
