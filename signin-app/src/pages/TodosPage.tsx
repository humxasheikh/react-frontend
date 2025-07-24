import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { addTodo, fectchTodos, type Todo } from '../services/todo';
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

  const onAdd = async (title: string) => {
    if (!token) return;

    console.log('Adding todo:', title);
    const newTodo = await addTodo(title, token!);
    console.log('New todo:', newTodo);
    alert(`This is a popup!, ${newTodo}`);
    const sleep = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));
    await sleep(20000);
    setTodos((todos) => [newTodo, ...todos!]);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className=" max-w-2xl mask-auto p-6  bg-gray-200 rounded w-full">
        <h1 className="text-center text-2xl font-bold mb-4"> My Todos</h1>
        {error && <div className="text-red-600">{error}</div>}
        <AddTodoForm onAdd={onAdd} />
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul>
            {todos?.map((todo) => (
              <li
                key={todo.id}
                className={`p-3 rounded border flex font-bold bg-white hover:bg-gray-100 hover:border-blue-700`}
              >
                <span
                  className={`flex-1/3 ${todo.completed ? 'line-through decoration-red-500 decoration-2 ' : ''}`}
                >
                  {todo.title}
                </span>
                <span className="flex-1/3">
                  {todo.completed ? 'completed' : 'pending'}
                </span>
                <button type="button" className="">
                  x
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TodosPage;
