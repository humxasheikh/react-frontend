import { useState } from 'react';
import type { TaskStatus } from '../../types/task';
import { useDispatch } from 'react-redux';
// import { addTask } from './tasksSlice';
import { v4 as uuidv4 } from 'uuid';

const AddTaskForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('todo');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    // dispatch(
    //   addTask({
    //     id: uuidv4(),
    //     title,
    //     description,
    //     status,
    //     createdAt: new Date().toISOString(),
    //   })
    // );

    setTitle('');
    setDescription('');
    setStatus('todo');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-300 shadow-md rounded mb-6 max-w-xl mx-auto"
    >
      <div className="h-fit m-1 bg-white rounded p-2">
        <h2 className="text-center font-semibold"> Add new Task</h2>
        <div>
          <label className="font-semibold">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className=" w-full rounded shadow border px-3 py-2"
          />
        </div>
        <div>
          <label className="font-semibold">Description</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className=" w-full rounded shadow border px-3 py-2"
          />
        </div>
        <div>
          <label className="font-semibold">Status</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={status}
            onChange={(e) => setStatus(e.target.value as TaskStatus)}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <button type="submit" className="w-full bg-blue-500 rounded mt-2">
          Add Task
        </button>
      </div>
    </form>
  );
};

export default AddTaskForm;
