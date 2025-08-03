import { useEffect } from 'react';
import AddTaskForm from './features/tasks/AddTaskForm';
import TaskBoard from './features/tasks/TaskBoard';
import { useAppDispatch } from './hooks';
import { fetchTasks } from './features/tasks/tasksSlice';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-center py-6">Task Manager</h1>
      <AddTaskForm />
      <TaskBoard />
    </div>
  );
}

export default App;
