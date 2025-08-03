import axio from 'axios';
import { URL } from './consts';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export const fectchTodos = async (token: string): Promise<Todo[]> => {
  try {
    const response = await axio.get(`${URL}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    if (axio.isAxiosError(e)) {
      throw e;
    } else {
      console.error(e);
      throw new Error('An unexpected error occurred');
    }
  }
};

export const addTodo = async (token: string, title: string): Promise<Todo> => {
  try {
    const response = await axio.post(
      `${URL}/tasks`,
      {
        title: title,
        completed: false,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (e) {
    if (axio.isAxiosError(e)) {
      throw e;
    } else {
      console.error(e);
      throw new Error('An unexpected error occurred');
    }
  }
};

export const deleteTodo = async (token: string, id: string): Promise<Todo> => {
  try {
    const response = await axio.delete(`${URL}/tasks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    if (axio.isAxiosError(e)) {
      throw e;
    } else {
      console.error(e);
      throw new Error('An unexpected error occurred');
    }
  }
};

export const updateTodo = async (
  token: string,
  id: string,
  completed: boolean
): Promise<Todo> => {
  try {
    const response = await axio.patch(
      `${URL}/tasks/${id}`,
      { completed },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (e) {
    if (axio.isAxiosError(e)) {
      throw e;
    } else {
      console.error(e);
      throw new Error('An unexpected error occurred');
    }
  }
};
