import TaskBoard from './features/tasks/TaskBoard';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-center py-6">Task Manager</h1>
      <TaskBoard />
    </div>
  );
}

export default App;
