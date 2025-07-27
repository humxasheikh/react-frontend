import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  addTodo,
  deleteTodo,
  fectchTodos,
  updateTodo,
  type Todo,
} from '../services/todo';
import { AxiosError } from 'axios';
import AddTodoForm from '../components/AddTodoForm';

const TodosPage = () => {
  const isFirstLoad = useRef(true);
  const { token } = useAuth();
  const [todos, setTodos] = useState<Todo[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!token || !isFirstLoad.current) return;
      isFirstLoad.current = false;
      console.log('Running fetchTodos effect');

      setLoading(true);
      try {
        const data = await fectchTodos(token);
        setTodos(data);
      } catch (e) {
        console.log(e);
        if (e instanceof AxiosError)
          setError(e.response?.data?.message ?? 'Invalid email or password.');
        else setError('Something went wrong.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [token]);

  const addHandler = async (title: string) => {
    if (!token) return;

    const newTodo = await addTodo(token!, title);
    setTodos((todos) => [newTodo, ...todos!]);
  };

  const deleteHandler = async (id: string) => {
    if (!token) return;
    try {
      const data = await deleteTodo(token, id);
      console.log(data);
      const newTodos = todos?.filter((todo) => todo.id !== id);
      setTodos([...newTodos!]);
    } catch (e) {
      console.log(e);
      if (e instanceof AxiosError)
        setError(e.response?.data?.message ?? 'Delete operation failed.');
      else setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const patchHandler = async (id: string) => {
    if (!token) return;
    try {
      const updatedTodo = todos?.find((t) => t.id === id);
      const data = await updateTodo(token, id, !updatedTodo?.completed);
      console.log(data);
      const newTodos = todos?.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      setTodos([...newTodos!]);
    } catch (e) {
      console.log(e);
      if (e instanceof AxiosError)
        setError(e.response?.data?.message ?? 'update failed.');
      else setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className=" max-w-2xl mask-auto p-6  bg-gray-200 rounded w-full">
        <h1 className="text-center text-2xl font-bold mb-4"> My Todos</h1>
        {error && <div className="text-red-600">{error}</div>}
        <AddTodoForm onAdd={addHandler} />
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul>
            {todos?.map((todo) => (
              <li
                key={todo.id}
                className={`p-3 rounded border flex  bg-white hover:bg-gray-100 hover:border-blue-700 mb-1`}
              >
                <span
                  onClick={() => patchHandler(todo.id)}
                  className={`flex-1/3 ${todo.completed ? 'line-through decoration-red-500 decoration-2 ' : ''}`}
                >
                  {todo.title}
                </span>
                <span className=" font-bold flex-1/3">
                  {todo.completed ? 'completed' : 'pending'}
                </span>
                <button onClick={() => deleteHandler(todo.id)}>x</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TodosPage;
