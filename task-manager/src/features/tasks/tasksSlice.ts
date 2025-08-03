import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { type Task } from '../../types/task';
import {
  createTaskAPI,
  fetchTasksAPI,
  removeTaskAPI,
  updateTaskAPI,
} from './tasksAPI';

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

export const addTask = createAsyncThunk('tasks/addTask', async (task: Task) => {
  return await createTaskAPI(task);
});

export const updateTask = createAsyncThunk(
  'tasks/createTask',
  async (task: Task) => {
    return await updateTaskAPI(task);
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id: string) => {
    return await removeTaskAPI(id);
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
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
      })
      .addCase(addTask.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.isLoading = false;
        state.tasks.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || 'Unable to create new task';
      })
      .addCase(updateTask.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.isLoading = false;
        state.tasks = state.tasks.map((t) =>
          t.id === action.payload.id ? action.payload : t
        );
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || 'Unable to create new task';
      })
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(
        deleteTask.fulfilled,
        (state, action: PayloadAction<{ id: string }>) => {
          state.isLoading = false;
          state.tasks = state.tasks.filter(
            (task) => task.id !== action.payload.id
          );
        }
      )
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.error.message || 'Unable to create new task';
      });
  },
});

export default tasksSlice.reducer;
