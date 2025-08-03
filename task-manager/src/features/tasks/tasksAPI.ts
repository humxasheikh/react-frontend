import type { Task } from '../../types/task';

const API_BASE = 'http://localhost:3000';

export const fetchTasksAPI = async (): Promise<Task[]> => {
  const res = await fetch(`${API_BASE}/task-manager`);
  if (!res.ok) throw new Error('Failed to fetch tasks');
  return res.json();
};

export const createTaskAPI = async (task: Task): Promise<Task> => {
  const res = await fetch(`${API_BASE}/task-manager`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error('Failed to create task');
  return res.json();
};

export const removeTask = async (id: string): Promise<{ id: string }> => {
  const res = await fetch(`${API_BASE}//task-manager/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete task');
  return { id };
};

export const updateTaskOnServer = async (task: Task): Promise<Task> => {
  const res = await fetch(`${API_BASE}//task-manager/${task.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  if (!res.ok) throw new Error('Failed to update task');
  return res.json();
};
