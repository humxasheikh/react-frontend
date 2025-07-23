import axios from 'axios';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

const todos = [
  {
    id: '1',
    title: 'learning react',
    completed: false,
  },
  {
    id: '2',
    title: 'learning react',
    completed: true,
  },
];

export const fectchTodos = async (token: string): Promise<Todo[]> => {
  return todos;
  try {
    const response = await axios.get(`${URL}//singup`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw e;
    } else {
      console.error(e);
      throw new Error('An unexpected error occurred');
    }
  }
};

export const addTodo = async (token: string, title: string): Promise<Todo> => {
  const todo: Todo = { id: `${Date.now},`, title, completed: false };
  return todo;
};
