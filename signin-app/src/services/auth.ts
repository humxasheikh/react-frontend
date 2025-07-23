import axios from 'axios';
import axio from 'axios';
import { URL } from './consts';

export const loginAPI = async (email: string, password: string) => {
  try {
    const response = await axio.post(`${URL}/auth/login`, {
      email,
      password,
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
