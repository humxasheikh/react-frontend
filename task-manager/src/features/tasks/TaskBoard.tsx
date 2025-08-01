import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { deleteTask, updateTask } from './tasksSlice';
import type { Task, TaskStatus } from '../../types/task';
import type { RootState } from '../../store';

const statusLabels: Record<TaskStatus, string> = {
  todo: 'To Do',
  'in-progress': 'In Progress',
  done: 'Done',
};

const TaskBoard = () => {
  const tasks = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();
  const grouped: Record<TaskStatus, Task[]> = {
    todo: [],
    'in-progress': [],
    done: [],
  };

  tasks.forEach((task) => grouped[task.status].push(task));

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Task>>({});

  const startEdit = (task: Task) => {
    setEditingId(task.id);
    setEditData({ ...task });
  };

  const saveEdit = () => {
    if (editingId && editData.title) {
      dispatch(updateTask(editData as Task));
      setEditingId(null);
      setEditData({});
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {(['todo', 'in-progress', 'done'] as TaskStatus[]).map((status) => (
        <div key={status} className="bg-gray-100 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-3">{statusLabels[status]}</h2>
          <div className="space-y-3">
            {grouped[status].map((task) => {
              const isEditing = editingId === task.id;

              return (
                <div
                  key={task.id}
                  className="bg-white p-3 rounded shadow border relative group"
                >
                  {isEditing ? (
                    <div className="space-y-2">
                      <input
                        className="w-full border px-2 py-1 rounded"
                        value={editData.title || ''}
                        onChange={(e) =>
                          setEditData((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                      />
                      <textarea
                        className="w-full border px-2 py-1 rounded"
                        value={editData.description || ''}
                        onChange={(e) =>
                          setEditData((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                      />
                      <select
                        className="w-full border px-2 py-1 rounded"
                        value={editData.status}
                        onChange={(e) =>
                          setEditData((prev) => ({
                            ...prev,
                            status: e.target.value as TaskStatus,
                          }))
                        }
                      >
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="done">Done</option>
                      </select>
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={saveEdit}
                          className="text-sm px-2 py-1 bg-green-600 text-white rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="text-sm px-2 py-1 bg-gray-400 text-white rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between">
                        <h3 className="font-medium">{task.title}</h3>
                        <div>
                          <button
                            onClick={() => startEdit(task)}
                            className="text-blue-500 text-sm mr-2"
                            title="Edit"
                          >
                            ✎
                          </button>
                          <button
                            onClick={() => dispatch(deleteTask(task.id))}
                            className="text-red-500 text-sm"
                            title="Delete"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                      {task.description && (
                        <p className="text-sm text-gray-600 mt-1">
                          {task.description}
                        </p>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskBoard;
