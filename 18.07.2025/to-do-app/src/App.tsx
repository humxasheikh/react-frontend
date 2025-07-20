import { useReducer } from 'react';
import { initialState, todoReducer } from './reducer/todoReducer';
import TodoForm from './components/TodoForm';

function App() {
  const [todos, dispatch] = useReducer(todoReducer, initialState);

  const addHandler = (text: string) => {
    dispatch({ type: 'ADD_TODO', payload: text });
  };

  const completedHandler = (id: number) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  return (
    <div className="h-screen bg-gray-400 flex justify-center items-center">
      <div className="bg-white p-6 w-full max-w-lg">
        <h1 className="text-2xl text-center font-bold ">Todo app</h1>
        <TodoForm onAdd={addHandler} />
        <ul className="space-y-2 mt-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="bg-gray-100 p-2 flex justify-between hover:bg-gray-50"
              onClick={() => completedHandler(todo.id)}
            >
              <span
                className={`cursor-pointer ${todo.completed ? 'line-through' : ''}`}
              >
                {' '}
                {todo.text}
              </span>
              <button
                onClick={() =>
                  dispatch({ type: 'DELETED_TODO', payload: todo.id })
                }
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
