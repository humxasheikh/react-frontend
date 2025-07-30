import { useSelector } from 'react-redux';
import type { Task } from '../../types/task';
import type { RootState } from '../../store';

const statusLabels: Record<Task['status'], string> = {
  todo: 'To Do',
  'in-progress': 'In progress',
  done: 'Done',
};

const TaskBoard = () => {
  const tasks = useSelector((state: RootState) => state.tasks);

  const grouped: Record<Task['status'], Task[]> = {
    todo: [],
    'in-progress': [],
    done: [],
  };

  tasks.map((task) => grouped[task.status].push(task));

  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-4 p-4">
      {(['todo', 'in-progress', 'done'] as Task['status'][]).map((status) => (
        <div key={status} className=" bg-gray-300 p-4 rounded-lg">
          <h4 className="text-center font-semibold">{statusLabels[status]}</h4>
          {grouped[status].map((task) => (
            <div
              key={task.id}
              className="bg-white m-2 p-2 rounded-lg shadow border"
            >
              <h5 className="font-medium">{task.title}</h5>
              {task.description && (
                <p className="text-sm text-gray-600 mt-1">{task.description}</p>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TaskBoard;
